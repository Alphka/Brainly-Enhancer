import ext from "webextension-polyfill"
import * as brainlyDetails from "../public/database/BrainlyDetails.json"
import _BrainlyEnhancer from "./controllers/BrainlyEnhancer"
import { createElement } from "./helpers"
import type { BrainlyHostnames } from "../typings/brainly"
import type { onMessageInformation } from "../typings/global"

let BrainlyEnhancer: _BrainlyEnhancer

class ContentScript {
	constructor(){
		BrainlyEnhancer = new _BrainlyEnhancer()

		BrainlyEnhancer.extension = {
			id: ext.runtime.id,
			URL: ext.runtime.getURL("").replace(/\/$/, "")
		}

		window.BrainlyEnhancer = BrainlyEnhancer
		this.Init()
	}
	Init(){
		ext.runtime.onMessage.addListener(this.MessageHandler.bind(this))
		window.addEventListener("getExtensionData", this.SendExtensionData.bind(this))

		this.AwaitHead().then(() => {
			this.InsertStyles()
			this.InsertScript("Main").addEventListener("load", this.InsertScripts.bind(this))
		})		
	}
	async MessageHandler(message: onMessageInformation, sender: ext.Runtime.MessageSender){
		const { action, data } = message
		
		if(action === "isContentScriptInjected") return Promise.resolve(true)
		return Promise.resolve()
	}
	async AwaitHead(){
		if(!document.head) return await new Promise<void>(resolve => {
			var listener = function(e: Event){
				if(!document.head) return
				
				document.removeEventListener("DOMSubtreeModified", listener)
				resolve()
			}

			document.addEventListener("DOMSubtreeModified", listener)
		})
	}
	InsertScripts(){
		const hostname: BrainlyHostnames = location.hostname as BrainlyHostnames
		
		if(this.TestPathname("tasks", "archive_mod")) this.InsertScript("ModerateAll")
		if(this.TestPathname("messages")) this.InsertScript("Messages")
		if(this.TestPathname(brainlyDetails[hostname].question)) this.InsertScript("Tasks")
	}
	InsertStyles(){
		if(this.TestPathname("tasks", "archive_mod")) this.InsertStyle("ModerateAll")

		chrome.storage.local.get(["darkTheme", "expandLayout"], values => {
			const { darkTheme, expandLayout } = values
			if(darkTheme) ext.runtime.sendMessage({ action: "insertDarkTheme" })
			if(expandLayout) ext.runtime.sendMessage({ action: "expandLayout" })
		})
	}
	TestPathname(...paths: string[]){
		const pathname = location.pathname.substr(1).split("/")
		return paths.toString() === pathname.slice(0, paths.length).toString()
	}
	InsertScript(file: string){
		return document.head.appendChild(createElement("script", {
			src: ext.runtime.getURL(`scripts/${file}/index.js`),
			type: "text/javascript"
		}))
	}
	InsertStyle(file: string){
		const element = createElement("link", {
			href: ext.runtime.getURL(`styles/${file}.css`),
			rel: "stylesheet",
			type: "text/css"
		})

		return document.head.prepend(element), element
	}
	SendExtensionData(event){
		window.postMessage({
			action: "setExtensionData",
			data: BrainlyEnhancer.extension,
		}, "*")
	}
}

new ContentScript()
