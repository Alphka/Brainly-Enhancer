import type { TopLayerCallback } from "."
import { waitElement } from "../../helpers"

export default class Toplayer {
	toplayer: HTMLDivElement
	callback: typeof TopLayerCallback
	opened: boolean

	constructor(callback: typeof TopLayerCallback){
		this.opened = false
		this.callback = callback
		this.Init()
	}
	async Init(){
		const toplayer = <HTMLDivElement>(await waitElement("#toplayer"))
		this.toplayer = toplayer

		const observer = new MutationObserver(this.listener.bind(this))
		observer.observe(toplayer, {
			attributes: true
		})
	}
	listener(mutations: MutationRecord[], observer: MutationObserver){
		this.callback(!this.toplayer.classList.contains("hidden"))
	}
}
