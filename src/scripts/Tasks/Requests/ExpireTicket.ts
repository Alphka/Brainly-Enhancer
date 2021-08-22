import RequestAction from "./RequestAction"

export default class ExpireTicket {
	promise?: Promise<{
		success: boolean
		message?: string
	}>

	constructor(taskId: number){
		this.Expire(taskId)
	}
	Expire(taskId: number){
		this.promise = RequestAction(location.origin + "/api/28/moderate_tickets/expire", {
			model_id: taskId,
			model_type_id: 1
		})
	}
}
