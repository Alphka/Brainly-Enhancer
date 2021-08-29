import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import type {
	GenericResponseBrainly,
	BrainlyActionData,
	GetUserByIdData,
	UserContentQuery,
	GetAnswersByIdResponse,
	BrainlyResponseMainView
} from "../../typings/brainly"

function GetModeratorURL(pathname: string){
	const url = new URL(location.origin + pathname)
	url.searchParams.append("client", "moderator-extension")
	return url.href.replace(/%5B%5D/g, "[]")
}

function Request(url: string, method?: "GET" | "POST", data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<GenericResponseBrainly>>
function Request<T>(url: string, method?: "GET" | "POST", data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
async function Request(url: string, method?: "GET" | "POST", data?: any, config?: AxiosRequestConfig){
	const requestData: AxiosRequestConfig = {
		method: method || "GET",
		url: GetModeratorURL(url)
	}

	if(data) requestData.data = data
	if(config) Object.assign(requestData, config)

	// Requesting
	let response: AxiosResponse

	await new Promise<void>(resolve => {
		axios(requestData).then(res => {
			response = res
		}).catch(error => {
			response = error.response
		}).finally(resolve)
	})

	return response
}

export async function RequestAction(url: string, data: BrainlyActionData, config?: AxiosRequestConfig){
	const response = await Request<GenericResponseBrainly>(url, "POST", data, config)

	return {
		/** Whether the action was successful */
		success: Boolean(response?.data?.success),
		/** Error message */
		message: response?.data?.message
	}
}

export function GetQuestion(questionId: string | number){
	return Request<BrainlyResponseMainView>("/api/28/api_tasks/main_view/" + questionId)
}

export function ExpireTicket(taskId: number){
	return RequestAction("/api/28/moderate_tickets/expire", {
		model_id: taskId,
		model_type_id: 1
	})
}

async function Delete(url: string, data: BrainlyActionData, config?: AxiosRequestConfig){
	const result = await RequestAction(url, data, config)
	if(result.success) setTimeout(() => ExpireTicket(data.taskId), 300)
	return result
}

export function DeleteQuestion(data: BrainlyActionData, config?: AxiosRequestConfig){
	data = Object.assign({
		give_warning: false,
		return_points: false,
		take_points: true,
		model_type_id: 1,
		reason_id: 52
	}, data)

	return Delete("/api/28/moderation_new/delete_task_content", data, config)
}

export function DeleteAnswer(data: BrainlyActionData, config?: AxiosRequestConfig){
	data = Object.assign({
		model_type_id: 2,
		give_warning: false,
		take_points: true,
		reason_id: 50
	}, data)

	return Delete("/api/28/moderation_new/delete_response_content", data, config)
}

export async function GetUsersById(...ids: (string | number)[]){
	const url = new URL(location.origin + "/api/28/api_users/get_by_id")
	ids.forEach(id => url.searchParams.append("id[]", String(id)))
	
	const response = await Request(url.pathname + url.search)
	const { data } = response

	if(!data.success) throw data.message || "Algo deu errado"
	return data.data as GetUserByIdData[]
}

async function GetContentQuery(userId: number, type: "questions" | "answers", hash: string, callback?: (id: number) => any, delay: number = 300){
	const market = (document.querySelector("meta[name=market]") as HTMLMetaElement)?.content
		|| window.siteLocale
		|| document.documentElement.className.split(" ").find(name => name.length === 2)

	const config: {
		url: URL
		canRequest: boolean
		before?: string,
		queryType: "UserQuestionsQuery" | "UserAnswersQuery"
	} = {
		url: new URL(`${location.origin}/graphql/${market}`),
		canRequest: true,
		before: null,
		queryType: type === "questions" ? "UserQuestionsQuery" : "UserAnswersQuery"
	}

	config.url.searchParams.append("operationName", config.queryType)

	config.url.searchParams.append("extensions", JSON.stringify({
		persistedQuery: {
			version: 1,
			sha256Hash: hash
		}
	}))

	const GetData = async (apiUrl: string, before: string = null) => {
		const url = new URL(apiUrl)
		
		url.searchParams.append("variables", JSON.stringify({
			userId,
			before
		}))

		const response = await Request<UserContentQuery>(url.pathname + url.search)

		return response.data.data.userById[type]
	}

	const allContent = new Array as number[]

	while(config.canRequest){
		if(allContent.length) await new Promise(resolve => setTimeout(resolve, delay))

		const data = await GetData(config.url.href, config.before).catch(BrainlyEnhancer.log)

		if(!data) break

		data.edges.forEach(edge => {
			const id: number = type === "questions" ? edge.node.databaseId : edge.node.question.databaseId
			
			!allContent.includes(id) && (
				allContent.push(id),
				callback?.(id)
			)
		})

		config.canRequest = data.pageInfo.hasNextPage
		config.before = data.pageInfo.endCursor
	}

	return allContent
}

/** Returns `undefined` if the answer was not found */
export async function GetAnswerIdByTask(userId: number, questionId: number){
	const request = await GetQuestion(questionId)
	return request.data.data.responses.find(answer => answer.user_id === userId)?.id
}

async function GetAnswersUsingOldApi(userId: number, callback?: (id: number) => any, delay: number = 300){
	const requestPage = (page: number) => Request<GetAnswersByIdResponse>(`/api/28/api_responses/get_by_user?userId=${userId}&page=${page}&limit=100`)

	const config: {
		currentPage: number
		lastPage?: number
		hasFinished: boolean
		allAnswers: number[]
	} = {
		currentPage: 1,
		hasFinished: false,
		allAnswers: new Array
	}

	while(!config.hasFinished){
		const response = await requestPage(config.currentPage)

		if(response?.status !== 200) throw new Error("Error using old API, trying to use fallback")

		if(response?.data?.success){
			const { data, pagination } = response.data

			if(!config.lastPage){
				const url = new URL(pagination.last)
				const lastPage = Number(url.searchParams.get("page"))

				// The user has no answers
				if(lastPage === 0) break

				config.lastPage = lastPage
			}

			data.forEach(answer => !config.allAnswers.includes(answer.id) && (
				config.allAnswers.push(answer.id),
				callback?.(answer.id)
			))

			config.currentPage === config.lastPage ? config.hasFinished = true : (
				config.currentPage++,
				await new Promise(resolve => setTimeout(resolve, delay))
			)
		}
	}
}

export async function GetAllAnswers(userId: number, callback?: (id: number) => any, delay: number = 300){
	const _oldApi: {
		allAnswers: number[]
		isSucess?: boolean
	} = {
		allAnswers: new Array
	}

	await new Promise<void>(resolve => {
		GetAnswersUsingOldApi(userId, answerId => {
			_oldApi.allAnswers.push(answerId)
			callback?.(answerId)
		}, delay).then(() => {
			_oldApi.isSucess = true
		})
		.catch(error => {
			_oldApi.isSucess = false
			BrainlyEnhancer.log(error)
		})
		.finally(resolve)
	})

	if(_oldApi.isSucess) return _oldApi.allAnswers

	// If the old api failed, fallback to this
	const config: {
		canLoop: boolean
		hasFinished: boolean
		allQuestions: number[]
		allAnswers: number[]
	} = {
		canLoop: true,
		hasFinished: false,
		allQuestions: new Array,
		allAnswers: new Array
	}

	const questionsCallback = (id: number) => {
		if(id && !config.allQuestions.includes(id)){
			config.allQuestions.push(id)
		}
	}

	GetContentQuery(userId, "answers", "6eeba1e17e17e533d95532979686feb05533a91b8cf27c239ab41909855a92b5", questionsCallback, delay).then(ids => {
		config.hasFinished = true
	})

	while(config.canLoop){
		if(!config.allQuestions.length){
			await new Promise(resolve => setTimeout(resolve, 100))
			continue
		}

		const questions = config.allQuestions.splice(0, 4)

		for(const questionId of questions){
			const answerId = await GetAnswerIdByTask(userId, questionId)

			if(answerId && !config.allAnswers.includes(answerId)){
				config.allAnswers.push(answerId)
				if(!_oldApi.allAnswers.includes(answerId)) callback?.(answerId)
			}
		}

		if(config.hasFinished && !config.allQuestions.length) config.canLoop = false
	}
	
	return config.allAnswers
}

export function GetAllQuestions(userId: number, callback?: (id: number) => any, delay: number = 300){
	return GetContentQuery(userId, "questions", "5d7554cffe3460517da62dee6a05cbc273d9ea65915a0f8465386b68165ec626", callback, delay)
}
