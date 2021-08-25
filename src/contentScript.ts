import ext from "webextension-polyfill"
import * as brainlyDetails from "../public/database/BrainlyDetails.json"
import _BrainlyEnhancer from "./controllers/BrainlyEnhancer"
import { createElement, waitElement } from "./helpers"
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
			this.InjectStyles()
			this.InsertScript("Main").addEventListener("load", this.InsertElements.bind(this))
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
	InsertElements(){
		const hostname = <BrainlyHostnames>location.hostname
		
		if(this.TestPathname("tasks", "archive_mod")){
			this.InsertScript("ModerateAll")
			this.InsertStyle("ModerateAll")
		}

		if(this.TestPathname("messages")) this.InsertScript("Messages")
		if(this.TestPathname(brainlyDetails[hostname].question)) this.InsertScript("Tasks")

		waitElement("html#html", {
			expires: 9000,
			noError: true
		}).then(e => {
			if(e.isError) return
			this.InsertStyle("OldLayoutFixes")
			this.InsertStyle("StyleGuide")
		})

		waitElement("body.mint", {
			expires: 9000,
			noError: true
		}).then(e => !e.isError && this.InsertScript("images/icons.js", false))

		const MainStyle = this.InsertStyle("Main")
		
		MainStyle.addEventListener("load", () => {
			waitElement("link[href*=style-guide]", {
				expires: 10000,
				noError: true
			}).then(style => {
				if(style.isError) return
				style.after(MainStyle)
			})
		})
	}
	InjectStyles(){
		chrome.storage.local.get(["darkTheme", "expandLayout"], values => {
			const { darkTheme, expandLayout } = values
			
			if(darkTheme){
				ext.runtime.sendMessage({ action: "insertDarkTheme" })
				waitElement("body").then(body => body.classList.add("dark"))
			}

			if(expandLayout) ext.runtime.sendMessage({ action: "expandLayout" })
		})
	}
	TestPathname(...paths: string[]){
		const pathname = location.pathname.substr(1).split("/")
		return paths.toString() === pathname.slice(0, paths.length).toString()
	}
	InsertScript(file: string, defaultFolder = true){
		const element = createElement("script", {
			src: ext.runtime.getURL(defaultFolder ? `scripts/${file}/index.js` : file),
			type: "text/javascript"
		})

		document.head.firstElementChild
			? document.head.firstElementChild.before(element)
			: document.head.appendChild(element)

		return element
	}
	InsertStyle(file: string, external = false){
		const element = createElement("link", {
			href: external ? file : ext.runtime.getURL(`styles/${file}.css`),
			rel: "stylesheet",
			type: "text/css",
			"data-added-by-extension": "true"
		})

		const mainStyle = document.querySelector(`link[data-added-by-extension="true"][href*=Main]`)
		if(mainStyle){
			mainStyle.before(element)
			return element
		}

		document.head.lastElementChild
			? document.head.lastElementChild.after(element)
			: document.head.appendChild(element)
			
		return element
	}
	SendExtensionData(){
		window.postMessage({
			action: "setExtensionData",
			data: BrainlyEnhancer.extension,
		}, "*")
	}
}

new ContentScript()
