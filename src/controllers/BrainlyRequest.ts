import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import type {
	GenericResponseBrainly,
	Presence,
	QuestionMainViewAnswerData,
	QuestionMainViewQuestionData,
	BrainlyActionData
} from "../../typings/brainly"

export interface BrainlyResponseMainView extends GenericResponseBrainly {
	data: {
		presence: Presence
		responses: QuestionMainViewAnswerData[]
		task: QuestionMainViewQuestionData
	}
}

function GetModeratorURL(...pathname: Array<number | string>){
	const url = new URL(location.origin + pathname.join(""))
	return url.searchParams.append("client", "moderator-extension"), url.href
}

export function GetQuestion(questionId: string | number){
	return <Promise<AxiosResponse<BrainlyResponseMainView>>>axios.get(GetModeratorURL("/api/28/api_tasks/main_view/", questionId))
}

export async function RequestAction(url: string, data: BrainlyActionData, config?: AxiosRequestConfig){
	let response: AxiosResponse

	await new Promise<void>(resolve => {
		axios.post(url, data, config).then(res => {
			response = res
		}).catch(error => {
			response = error.response
		}).finally(resolve)
	})

	return {
		/** Whether the action was successful */
		success: Boolean(response?.data?.success),
		/** Error message */
		message: response?.data?.message
	}
}

export function ExpireTicket(taskId: number){
	return RequestAction(GetModeratorURL("/api/28/moderate_tickets/expire"), {
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

	return Delete(GetModeratorURL("/api/28/moderation_new/delete_task_content"), data, config)
}

export function DeleteAnswer(data: BrainlyActionData, config?: AxiosRequestConfig){
	data = Object.assign({
		model_type_id: 2,
		give_warning: false,
		take_points: true
	}, data)

	return Delete(GetModeratorURL("/api/28/moderation_new/delete_response_content"), data, config)
}
