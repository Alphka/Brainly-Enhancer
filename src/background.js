async function getCurrentTab(){
	return await chrome.tabs.query({
		active: true,
		currentWindow: true
	})
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if(!tab.url || !tab.url.includes(".")) return

	const url = new URL(tab.url)
	if(!url.hostname) return
	
	const permission = {
		permissions: ["tabs"],
		origins: [`*://${url.hostname}/*`]
	}

	if(changeInfo.status === "loading") chrome.permissions.contains(permission, hasAccess => {
		if(!hasAccess) return

		chrome.tabs.executeScript(tabId, {
			file: "src/content.js",
			runAt: "document_start",
			allFrames: false
		})
	})
})