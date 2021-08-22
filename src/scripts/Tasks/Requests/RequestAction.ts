import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import type { BrainlyActionData } from "./DeleteContent"

export default async function RequestAction(url: string, data: BrainlyActionData, config?: AxiosRequestConfig){
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
