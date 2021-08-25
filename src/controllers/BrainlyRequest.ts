import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios"
import type {
	GenericResponseBrainly,
	Presence,
	QuestionMainViewAnswerData,
	QuestionMainViewQuestionData,
	BrainlyActionData,
	GetUserByIdData,
	GetAnswersByIdResponse,
	GetQuestionsByIdResponse
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

async function Request<T>(
	url: string,
	method?: "GET" | "POST",
	data?: any,
	config?: AxiosRequestConfig
): Promise<AxiosResponse<T>>{
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
	return <Promise<AxiosResponse<BrainlyResponseMainView>>>Request("/api/28/api_tasks/main_view/" + questionId)
}

export function ExpireTicket(taskId: number){
	return RequestAction("/api/28/moderate_tickets/expire", {
		model_id: taskId,
		model_type_id: 1
	})
}

async function Delete(url: string, data: BrainlyActionData, config?: AxiosRequestConfig){
	const result = await RequestAction(url, data, config)
	if(result.success) ExpireTicket(data.taskId)
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

export async function GetUsersById(...ids: Array<string | number>){
	const url = new URL(location.origin + "/api/28/api_users/get_by_id")
	ids.forEach(id => url.searchParams.append("id[]", String(id)))
	
	const response = await Request<GenericResponseBrainly>(url.pathname + url.search)
	const { data } = response

	if(!data.success) throw data.message || "Algo deu errado"
	return <GetUserByIdData[]>data.data
}

export function GetAllAnswers(userId: number | string, callback?: (id: number) => any, limit: number | string = 100, delay: number = 300){
	const data: {
		allAnswers: Set<number>
		currentPage: number
		canFetch: boolean
		lastPage?: number
	} = {
		allAnswers: new Set,
		currentPage: 1,
		canFetch: true
	}	

	return new Promise<number[]>(async resolve => {
		while(data.canFetch){
			const request = await Request<GetAnswersByIdResponse>(`/api/28/api_responses/get_by_user?userId=${userId}&page=${data.currentPage}&limit=${limit}`)

			if(request?.data?.success){
				const response = request.data

				if(!data.lastPage){
					const url = new URL(response.pagination.last)
					data.lastPage = Number(url.searchParams.get("page"))
				}

				const answers = response.data.map(answer => answer.id)

				answers.forEach(id => {
					if(!data.allAnswers.has(id)) data.allAnswers.add(id)
					if(callback) callback(id)
				})

				if(data.lastPage === 0 || data.currentPage === data.lastPage){
					data.canFetch = false
					break
				}

				data.currentPage++
			}

			if(!request) BrainlyEnhancer.Error("Request failed")
			await new Promise(resolve => setTimeout(resolve, delay))
		}

		resolve([...data.allAnswers.values()])
	})
}

export async function GetAllQuestions(userId: number, callback?: (id: number) => any, delay: number = 300){
	const market = (<HTMLMetaElement>document.querySelector("meta[name=market]"))?.content || window.siteLocale || document.documentElement.className

	const config: {
		url: URL
		canRequest: boolean
		before?: string
	} = {
		url: new URL(`${location.origin}/graphql/${market}`),
		canRequest: true,
		before: null
	}

	config.url.searchParams.append("operationName", "UserQuestionsQuery")
	config.url.searchParams.append("extensions", JSON.stringify({
		persistedQuery: {
			version: 1,
			sha256Hash: "5d7554cffe3460517da62dee6a05cbc273d9ea65915a0f8465386b68165ec626"
		}
	}))

	const GetData = async (apiUrl: string, before: string = null) => {
		const url = new URL(apiUrl)
		
		url.searchParams.append("variables", JSON.stringify({
			userId,
			before
		}))

		const response = await Request<GetQuestionsByIdResponse>(url.pathname + url.search)

		return response.data.data.userById.questions
	}

	return new Promise<number[]>(async resolve => {
		const allAnswers = new Array as number[]

		while(config.canRequest){
			if(allAnswers.length) await new Promise(resolve => setTimeout(resolve, delay))

			const data = await GetData(config.url.href, config.before)
	
			data.edges.forEach(edge => {
				const id = edge.node.databaseId
				
				if(!allAnswers.includes(id)){
					allAnswers.push(id)
					if(callback) callback(id)
				}
			})
	
			config.canRequest = data.pageInfo.hasNextPage
			config.before = data.pageInfo.endCursor
		}

		resolve(allAnswers)
	})
}
