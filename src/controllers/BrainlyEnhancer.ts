import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import * as defaultReasons from "../../public/database/DefaultReasons.json"

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
		fetched: boolean
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
			fetched: false,
			answers: defaultReasons.response,
			questions: defaultReasons.task
		}
	}
	async FetchReasons(){
		if(this.quickButtonsReasons.fetched) return await this.quickButtonsReasons.promise
		this.quickButtonsReasons.fetched = true

		return this.quickButtonsReasons.promise = new Promise<void>(async (resolve, reject) => {
			const response = await axios.post(`${location.origin}/api/28/moderation_new/get_content`, {
				model_id: jsData.question.databaseId,
				model_type_id: 1
			}).catch(reject)

			if(!response || !response.data?.data) return
			this.setDeleteReasonsDetails(response, "questions")
			this.setDeleteReasonsDetails(response, "answers")
			resolve()
		})
	}
	private setDeleteReasonsDetails(
		response: AxiosResponse,
		type: "questions" | "answers"
	){
		const { delete_reasons }: {
			delete_reasons: {
				comment: BrainlyReasonCategory[]
				response: BrainlyReasonCategory[]
				task: BrainlyReasonCategory[]
			}
		} = response.data.data
	
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
	
			if(!match){
				console.error([
					delete_reasons[BrainlyType],
					reason.category,
					delete_reasons[BrainlyType].find(category => category.id === reason.category),
					delete_reasons[BrainlyType].find(category => category.id === reason.category)?.subcategories.find(subcategory => subcategory.id === reason.subCategory)
				])
				
				throw new Error(`Could not find delete reason for ${type}`)
			}
		}
	}
	checkPrivileges(...ids: number[]){
		if(!window.dataLayer?.[0].user.isLoggedIn) return false
		if(!window.__default_config?.user?.ME) throw new Error("User data is not defined")
		return ids.length && ids.filter(id => JSON.parse(__default_config.user.ME).privileges.includes(id)).length === ids.length
	}
	Error(message: string){
		this.log(message)
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
}

export default BrainlyEnhancer
