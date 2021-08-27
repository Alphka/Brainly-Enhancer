import ext from "webextension-polyfill"
import * as brainlyDetails from "../public/database/BrainlyDetails.json"
import _BrainlyEnhancer from "./controllers/BrainlyEnhancer"
import { createElement, waitElement, waitObject } from "./helpers"
import type { BrainlyHostnames } from "../typings/brainly"
import type { onMessageInformation } from "../typings/global"
import { waitForBody } from "./helpers/waitForBody"

let BrainlyEnhancer: _BrainlyEnhancer

class ContentScript {
	constructor(){
		BrainlyEnhancer = new _BrainlyEnhancer()

		BrainlyEnhancer.extension = {
			id: ext.runtime.id,
			URL: ext.runtime.getURL("").replace(/\/$/, "")
		}

		window.BrainlyEnhancer = BrainlyEnhancer

		this.InjectStyles()

		ext.runtime.onMessage.addListener(this.MessageHandler.bind(this))
		window.addEventListener("getExtensionData", this.SendExtensionData.bind(this))
		window.addEventListener("toggleDarkTheme", this.ToggleDarkTheme.bind(this))

		this.AwaitHead().then(() => {
			this.InsertScript("Main").addEventListener("load", this.InsertElements.bind(this))
		})
	}
	async MessageHandler(message: onMessageInformation, sender: ext.Runtime.MessageSender){
		const { action, data } = message
		
		if(action === "isContentScriptInjected") return Promise.resolve(true)
	}
	AwaitHead(){
		if(!document.head) return new Promise<void>(resolve => {
			var listener = (e: Event) => document.head && (
				document.removeEventListener("DOMSubtreeModified", listener),
				resolve()
			)

			document.addEventListener("DOMSubtreeModified", listener)
		})

		return Promise.resolve()
	}
	InsertElements(){
		const MainStyle = this.InsertStyle("Main")
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
			this.InsertScript("images/icons.js", false)
		})
		
		MainStyle.addEventListener("load", async () => {
			const brainlyStyles = [
				`link[href*="/sf/css/main]"`,
				`link[href*="style-guide"]`
			]

			await waitObject(brainlyStyles.map(selector => `document.querySelector(${JSON.stringify(selector)})`).join(" || "))
			
			document.head.lastElementChild?.after(MainStyle)
		})
	}
	InjectStyles(){
		chrome.storage.local.get(["darkTheme", "expandLayout"], async values => {
			const { darkTheme, expandLayout } = values

			if(darkTheme) this.ToggleDarkTheme(false)
			if(expandLayout) ext.runtime.sendMessage({action: "expandLayout"})
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
	InsertStyle(file: string, external = false, id?: string){
		const element = createElement("link", {
			href: external ? file : ext.runtime.getURL(`styles/${file}.css`),
			rel: "stylesheet",
			type: "text/css",
			"data-added-by-extension": "true",
			id
		})

		const mainStyle = document.querySelector(`link[data-added-by-extension="true"][href*=Main]`)

		mainStyle
			? mainStyle.before(element)
			: document.head.lastElementChild
			? document.head.lastElementChild.after(element)
			: document.head.appendChild(element)
			
		return element
	}
	ToggleDarkTheme(setStorage = true){
		document.documentElement.classList.toggle("dark")

		if(setStorage){
			const isDarkTheme = document.documentElement.classList.contains("dark")
			
			return new Promise<void>(resolve => chrome.runtime.sendMessage(BrainlyEnhancer.extension.id, {
				action: "setDarkTheme",
				data: Boolean(isDarkTheme)
			}, success => {
				window.dispatchEvent(new CustomEvent("darkThemeChanged", {
					detail: { success }
				}))

				resolve()
			}))
		}

		return Promise.resolve()
	}
	SendExtensionData(){
		window.postMessage({
			action: "setExtensionData",
			data: BrainlyEnhancer.extension,
		}, "*")
	}
}

new ContentScript()
