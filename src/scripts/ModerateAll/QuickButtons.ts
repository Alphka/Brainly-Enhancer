// Unfinished code

import type { ZadaniumObject } from "../../../typings/Zadanium"
import type Reasons from "../../../public/database/DefaultReasons.json"
import { createElement, waitElement } from "../../helpers"

export default class ModerateAllQuickButtons {
	mainContainer: HTMLDivElement
	reasons: typeof Reasons

	constructor(){
		// this.Init()
	}
	async Init(){
		this.mainContainer = await waitElement("#moderation-all > .content") as HTMLDivElement
		this.Listen()
	}
	Listen(){
		const observer = new MutationObserver((mutations, observer) => {
			if(mutations.some(mutation => mutation.addedNodes.length)) this.AppendButtons()
		})

		observer.observe(this.mainContainer, {
			childList: true
		})
	}
	AppendButtons(){
		const items = Array.from(document.querySelectorAll(".moderation-item")) as HTMLDivElement[]

		items.forEach(item => {
			const hash = item.getAttribute("objecthash")
			const content = item.querySelector(":scope > .content") as HTMLDivElement
			const footer = content.querySelector(":scope > .footer") as HTMLDivElement
			this.AddListener(hash, footer)
		})
	}
	AddListener(hash: string, footer: HTMLDivElement){
		const ZadaniumObject = Zadanium.getObject(hash) as ZadaniumObject
		const ButtonsContainer = createElement("div", {
			children: [

			]
		})

		console.log(ZadaniumObject)
	}
}
