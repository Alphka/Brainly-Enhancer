import type { AxiosRequestConfig } from "axios"
import ExpireTicket from "./ExpireTicket"
import RequestAction from "./RequestAction"

export type BrainlyActionData = {
	model_id: number
	reason_id?: number
	reason?: string
	model_type_id?: number
	give_warning?: boolean
	take_points?: boolean
	taskId?: number
}

export default class DeleteContent {
	promise?: Promise<{
		success: boolean
		message?: string
	}>

	constructor(type: "question" | "answer", data: BrainlyActionData){
		if(type === "question") this.DeleteQuestion(data)
		else if(type === "answer") this.DeleteAnswer(data)
		else throw new Error("Type not valid: " + type)
	}
	async Delete(url: string, data: BrainlyActionData, config?: AxiosRequestConfig){
		const result = await RequestAction(url, data, config)
		if(result.success) new ExpireTicket(data.taskId)
		return result
	}
	DeleteQuestion(data: BrainlyActionData){
		Object.assign(data, {
			give_warning: false,
			return_points: false,
			take_points: true,
			model_type_id: 1
		})

		return this.promise = this.Delete(location.origin + "/api/28/moderation_new/delete_task_content", data)
	}
	DeleteAnswer(data: BrainlyActionData){
		Object.assign(data, {
			model_type_id: 2,
			give_warning: false,
			take_points: true
		})

		return this.promise = this.Delete(location.origin + "/api/28/moderation_new/delete_response_content", data)
	}
}
