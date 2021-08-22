import ext from "webextension-polyfill"
import { onMessageInformation, StorageTypes } from "../../typings/global"
import { IsBrainly, isURL } from "../helpers"

class Background {
	blockedDomains: RegExp
	requestFilter: ext.WebRequest.RequestFilter

	constructor(){
		this.blockedDomains = /mc\.yandex\.ru|hotjar\.com|google(-analytics|tagmanager|adservices|tagservices)\.com|kissmetrics\.com|doubleclick\.net|ravenjs\.com|browser\.sentry-cdn\.com|datadome\.co/i
		this.requestFilter = {
			urls: ["<all_urls>"]
		}

		this.BindListeners()
	}
	BindListeners(){
		ext.tabs.onUpdated.addListener(this.InjectContentScript.bind(this))
		ext.runtime.onMessage.addListener(this.MessageRequestHandler.bind(this))
		ext.runtime.onMessageExternal.addListener(this.MessageRequestHandler.bind(this))

		ext.webRequest?.onBeforeRequest.addListener(({ url, initiator }) => ({
			cancel: Boolean(initiator && IsBrainly(initiator) && this.blockedDomains.test(url))
		}), this.requestFilter, ["blocking"])
	}
	async InjectContentScript(
		tabId: number,
		changeInfo: ext.Tabs.OnUpdatedChangeInfoType,
		tab: ext.Tabs.Tab
	){
		if(!tab.url || !isURL(tab.url)) return
		
		const url = new URL(tab.url)

		if(changeInfo.status === "loading"){
			const permission = await ext.permissions.contains({
				permissions: ["tabs"],
				origins: [`*://${url.hostname}/*`]
			})

			if(!permission) return

			if(IsBrainly(tab.url) && !(await this.TabHasContentScript(tabId))){
				ext.tabs.insertCSS(tabId, {
					file: "styles/Main.css",
					runAt: "document_start"
				}).catch(console.error)
	
				ext.tabs.executeScript(tabId, {
					file: "contentScript.js",
					runAt: "document_start"
				}).catch(console.error)
			}
		}
	}
	async MessageRequestHandler(request: onMessageInformation, sender: ext.Runtime.MessageSender){
		if(!request.action) return false
		const { action, data } = request

		if(action === "insertDarkTheme") return await ext.tabs.insertCSS(sender.tab?.id, {
			file: "styles/DarkTheme.css",
			runAt: "document_start"
		})

		if(action === "expandLayout") return await ext.tabs.insertCSS(sender.tab?.id, {
			file: "styles/Extended.css",
			runAt: "document_start"
		})

		if(action === "setDarkTheme"){
			const value: boolean = typeof data === "undefined"
				? !Boolean((await ext.storage.local.get("darkTheme"))["darkTheme"])
				: data

			return ext.storage.local.set({darkTheme: value})
		}

		if(action === "setExpandLayout"){
			const value: boolean = typeof data === "undefined"
				? !Boolean((await ext.storage.local.get("expandLayout"))["expandLayout"])
				: data

			return ext.storage.local.set({expandLayout: value})
		}

		if(action === "setStorage"){
			const { keys, value, type }: {
				keys: string[]
				value: any
				type: StorageTypes
			} = data

			return ext.storage[type].set(Object.fromEntries(keys.map(key => [key, value])))
		}

		if(action === "getStorage"){
			const keys: string[] = typeof data.keys === "string" ? [data.keys] : data.keys
			const type: StorageTypes = data.type

			const storage = await ext.storage[type].get(keys)
			const values = keys.map(key => storage[key])

			if(typeof data.keys === "string") return values[0]
			else return values
		}

		return false
	}
	async TabHasContentScript(tabId: number){
		let success = false
		try{
			if(tabId) success = await ext.tabs.sendMessage(tabId, {
				action: "isContentScriptInjected"
			})
		}catch(error){}

		return success
	}	  
}

new Background()
