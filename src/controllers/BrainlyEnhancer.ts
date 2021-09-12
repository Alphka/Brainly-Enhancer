import defaultReasons from "../../public/database/DefaultReasons.json"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getStorage, setStorage, waitObject, isNumber } from "../helpers"
import { ExpireTicket } from "."

type QuickButtonsReasons = {
	category: number
	subCategory: number
	reasonTitle?: string
	reasonText?: string
}

type BrainlyReasonCategory = {
	abuse_category_id: number
	id: number
	subcategories: BrainlyReasonSubcategory[]
	text: string
}

type BrainlyReasonSubcategory = {
	id: number
	text: string
	title: string
}

class BrainlyEnhancer {
	quickButtonsReasons: {
		promise?: Promise<any>
		answers: QuickButtonsReasons[]
		questions: QuickButtonsReasons[]
	}
	extension: {
		id: string
		URL: string
	}

	constructor(){
		this.quickButtonsReasons = {
			answers: defaultReasons.response,
			questions: defaultReasons.task
		}
	}
	async FetchReasons(){
		if(this.quickButtonsReasons.promise) return await this.quickButtonsReasons.promise

		return this.quickButtonsReasons.promise = new Promise<void>(async (resolve, reject) => {
			const storage = await getStorage("QuickButtonsReasons", "local")

			if(storage){
				this.setDeleteReasonsDetails("questions", false, storage)
				this.setDeleteReasonsDetails("answers", false, storage)
				return resolve()
			}

			const response = await axios.post(`${location.origin}/api/28/moderation_new/get_content`, {
				model_id: jsData.question.databaseId,
				model_type_id: 1
			}).catch(reject)

			ExpireTicket(jsData.question.databaseId).catch(this.Error.bind(this))

			if(!response || !response.data?.data) return
			await setStorage("QuickButtonsReasons", response.data.data.delete_reasons, "local")
			this.setDeleteReasonsDetails("questions", true, response)
			this.setDeleteReasonsDetails("answers", true, response)
			resolve()
		})
	}
	private setDeleteReasonsDetails(type: "questions" | "answers", isAxios: false, response: object): void
	private setDeleteReasonsDetails(type: "questions" | "answers", isAxios: true, response: AxiosResponse): void
	private setDeleteReasonsDetails(type: "questions" | "answers", isAxios: boolean, response: AxiosResponse){
		const delete_reasons: {
			comment: BrainlyReasonCategory[]
			response: BrainlyReasonCategory[]
			task: BrainlyReasonCategory[]
		} = isAxios ? response.data.data.delete_reasons : response

		const BrainlyType = type === "questions" ? "task" : "response"

		for(const reason of this.quickButtonsReasons[type]){
			const match = delete_reasons[BrainlyType].find(category => {
				if(category.id !== reason.category) return
				return Boolean(category.subcategories.find(subCategory => {
					if(subCategory.id !== reason.subCategory) return
					reason.reasonTitle = subCategory.title
					reason.reasonText = subCategory.text
					return true
				}))
			})

			if(!match) throw new Error(`Could not find delete reason for ${type}`)
		}
	}
	checkPrivileges(...ids: number[]){
		if(!window.dataLayer?.[0]?.user.isLoggedIn) return false
		if(!window.__default_config?.user?.ME) throw new Error("User data is not defined")
		return ids.length && ids.filter(id => JSON.parse(__default_config.user.ME).privileges.includes(id)).length === ids.length
	}
	Error(message: any){
		window.BrainlyEnhancer.log(message instanceof Error ? message : new Error(String(message)))
	}
	log(...args: any[]){
		if(!args || !args.length) return

		args.every(arg => typeof arg === "string")
			? console.log("%c" + args.join(" "), "color: #3371ff; font-size:15px;")
			: args.every(arg => arg instanceof Error)
			? console.error(...args)
			: console.log(...args)
	}
	async request(url: string, method: "POST" | "GET" = "GET", data?: any, config?: AxiosRequestConfig){
		const _url = new URL(url)
		_url.searchParams.append("client", "moderator-extension")
		url = _url.href

		if(method === "GET") return (await axios.get(url, config)).data
		else if(method === "POST") return (await axios.post(url, data, config)).data
		else throw new Error("Method not allowed: " + method)
	}
	toBackground(action: string, data?: any){
		if(!data) data = {}

		const details = {
			action,
			...data
		}

		return new Promise((resolve, reject) => {
			try{
				chrome.runtime.sendMessage(this.extension?.id, details, resolve)
			}catch(error){
				reject(error)
			}
		})
	}
	ExtractId(string: string, forceReturnArray?: false): number | number[]
	ExtractId(string: string, forceReturnArray: true): number[]
	ExtractId(string: string, forceReturnArray?: boolean){
		const ids = string
			.replace(/((?:.*?[-:/"])(?=\d))|(?:[?/"#].*)|(?:[a-z]{1,})|-/gi, "")
			.split(/[\r\n\t]+/)
			.map(line => line.trim())
			.filter(id => isNumber(id))
			.map(id => Number(id))

		return !forceReturnArray && ids.length === 1 ? ids[0] : ids
	}
	get isLogged(){
		return new Promise<boolean>(async resolve => {
			if(!window.dataLayer?.[0]) await waitObject(`Object.prototype.toString.call(window.dataLayer) === "[object Array]"`)
			resolve(window.dataLayer[0].user.isLoggedIn)
		})
	}
	get isModerator(){
		return new Promise<boolean>(async resolve => {
			if(!(await this.isLogged)) return false

			await waitObject(`document.querySelector("meta[name=user_data]") || document.querySelector("#moderate-functions-panel")`)

			const moderatePanel = document.querySelector("#moderate-functions-panel") as HTMLDivElement
			const userDataElement = document.querySelector("meta[name=user_data]") as HTMLMetaElement

			if(userDataElement?.content) resolve(JSON.parse(userDataElement.content).isModerator)
			else if(moderatePanel) resolve(true)
			else resolve(false)
		})
	}
}

export default BrainlyEnhancer
