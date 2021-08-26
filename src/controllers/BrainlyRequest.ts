import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import type {
	GenericResponseBrainly,
	Presence,
	QuestionMainViewAnswerData,
	QuestionMainViewQuestionData,
	BrainlyActionData,
	GetUserByIdData,
	UserContentQuery
} from "../../typings/brainly"

export interface BrainlyResponseMainView extends GenericResponseBrainly {
	data: {
		presence: Presence
		responses: QuestionMainViewAnswerData[]
		task: QuestionMainViewQuestionData
	}
}

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
	if(result.success) setTimeout(() => ExpireTicket(data.taskId), 1000)
	return result
}

export function DeleteQuestion(data: BrainlyActionData, config?: AxiosRequestConfig){
	data = Object.assign({
		give_warning: false,
		return_points: false,
		take_points: true,
		model_type_id: 1
	}, data)

	return Delete("/api/28/moderation_new/delete_task_content", data, config)
}

export function DeleteAnswer(data: BrainlyActionData, config?: AxiosRequestConfig){
	data = Object.assign({
		model_type_id: 2,
		give_warning: false,
		take_points: true
	}, data)

	return Delete("/api/28/moderation_new/delete_response_content", data, config)
}

export async function GetUsersById(...ids: (string | number)[]){
	const url = new URL(location.origin + "/api/28/api_users/get_by_id")
	ids.forEach(id => url.searchParams.append("id[]", String(id)))
	
	const response = await Request(url.pathname + url.search)
	const { data } = response

	if(!data.success) throw data.message || "Algo deu errado"
	return <GetUserByIdData[]>data.data
}

async function GetContentQuery(userId: number, type: "questions" | "answers", hash: string, callback?: (id: number) => any, delay: number = 300){
	const market = (<HTMLMetaElement>document.querySelector("meta[name=market]"))?.content || window.siteLocale || document.documentElement.className

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

	return new Promise<number[]>(async resolve => {
		const allContent = new Array as number[]

		while(config.canRequest){
			if(allContent.length) await new Promise(resolve => setTimeout(resolve, delay))

			const data = await GetData(config.url.href, config.before)
	
			data.edges.forEach(edge => {
				const id: number = type === "questions" ? edge.node.databaseId : edge.node.question.databaseId
				
				if(!allContent.includes(id)){
					allContent.push(id)
					if(callback) callback(id)
				}
			})
	
			config.canRequest = data.pageInfo.hasNextPage
			config.before = data.pageInfo.endCursor
		}

		resolve(allContent)
	})
}

/** Returns `undefined` if the answer was not found */
export async function GetAnswerIdByTask(userId: number, questionId: number){
	console.log("Requesting task api", userId, questionId)
	const request = await GetQuestion(questionId)
	return request.data.data.responses.find(answer => answer.user_id === userId)?.id
}

export async function GetAllAnswers(userId: number, callback?: (id: number) => any, delay: number = 300){
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
			console.log("Tarefa adicionada:", id)
		}
	}

	GetContentQuery(userId, "answers", "6eeba1e17e17e533d95532979686feb05533a91b8cf27c239ab41909855a92b5", questionsCallback, delay).then(ids => {
		config.hasFinished = true
	})

	while(config.canLoop){
		console.log("Entering loop")

		if(!config.allQuestions.length){
			console.log("No length")
			await new Promise(resolve => setTimeout(resolve, 100))
			continue
		}

		const questions = config.allQuestions.splice(0, 4)

		for(const questionId of questions){
			const answerId = await GetAnswerIdByTask(userId, questionId)

			if(answerId && !config.allAnswers.includes(answerId)){
				config.allAnswers.push(answerId)
				if(callback) callback(answerId)
			}
		}

		if(config.hasFinished && !config.allQuestions.length) config.canLoop = false
	}
	
	return config.allAnswers
}

export function GetAllQuestions(userId: number, callback?: (id: number) => any, delay: number = 300){
	return GetContentQuery(userId, "questions", "5d7554cffe3460517da62dee6a05cbc273d9ea65915a0f8465386b68165ec626", callback, delay)
}
