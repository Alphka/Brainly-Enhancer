function isURL(string){
	if(string instanceof URL) return true
	if(!string || typeof string !== "string" || !string.includes(".")) return false

	try{
		const url = new URL(string)
		return url.hostname
	}catch(error){
		return false
	}
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if(!isURL(tab.url)) return

	const url = new URL(tab.url)
	if(changeInfo.status === "loading") chrome.permissions.contains({
		permissions: ["tabs"],
		origins: [`*://${url.hostname}/*`]
	}, async hasAccess => {
		if(!hasAccess) return

		chrome.tabs.executeScript(tabId, {
			file: "src/content.js",
			runAt: "document_start"
		})

		chrome.tabs.insertCSS(tabId, {
			file: "src/styles/Main.css",
			runAt: "document_start"
		})
	})
})

async function MessageRequestHandler(request, sender, sendResponse){
	const { action } = request
	
	let success, response
	if(action === "insertDarkTheme") chrome.tabs.insertCSS(sender.tab.id, {
		file: "src/styles/DarkTheme.css",
		runAt: "document_start"
	})
	
	if(action === "expandLayout") chrome.tabs.insertCSS(sender.tab.id, {
		file: "src/styles/Extended.css",
		runAt: "document_start"
	})

	if(!action) success = false
	if(success === undefined) success = true

	response ? sendResponse(Object.assign(response, { success })) : sendResponse({ success })
}

chrome.runtime.onMessage.addListener(MessageRequestHandler)
chrome.runtime.onMessageExternal.addListener(MessageRequestHandler)