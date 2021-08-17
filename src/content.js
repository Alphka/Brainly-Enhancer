(function(){
	const brainlyDetails = {
		"brainly.com.br": {
			lang: "pt",
			question: "tarefa"
		},
		"brainly.com": {
			lang: "us",
			question: "question"
		},
		"brainly.ph": {
			lang: "ph",
			question: "question"
		},
		"brainly.co.id": {
			lang: "id",
			question: "tugas"
		},
		"brainly.ro": {
			lang: "ro",
			question: "tema"
		},
		"eodev.com": {
			lang: "tr",
			question: "gorev"
		},
		"brainly.lat": {
			lang: "es",
			question: "tarea"
		},
		"znanija.com": {
			lang: "ru",
			question: "task"
		},
		"brainly.pl": {
			lang: "pl",
			question: "zadanie"
		},
		"brainly.in": {
			lang: "hi",
			question: "question"
		},
		"nosdevoirs.fr": {
			lang: "fr",
			question: "devoir"
		}
	}

	if(!Object.getOwnPropertyNames(brainlyDetails).includes(location.hostname)) return
	
	function testPath(...paths){
		const pathname = location.pathname.substr(1).split("/")
		return paths.toString() === pathname.slice(0, paths.length).toString()
	}
	
	function insertHead(tagName, fileName){
		const element = document.createElement(tagName),
		extension = `chrome-extension://${chrome.runtime.id}/src`
	
		switch(tagName){
			case "script":
				element.src = `${extension}/scripts/${fileName}`
				element.type = "text/javascript"
			break
			case "style":
				element.href = `${extension}/styles/${fileName}`
				element.rel = "stylesheet"
			break
			default: throw new ReferenceError("tagName not allowed: " + tagName)
		}
	
		document.head.appendChild(element)
	}
	
	function waitForGlobalScript(){
		return new Promise(resolve => {
			const observer = new MutationObserver((mutations, observer) => document.head.dataset.beLoaded && (
				document.head.removeAttribute("data-be-loaded"),
				document.head.dataset.brainlyEnhancerId = chrome.runtime.id,
				observer.disconnect(),
				resolve()
			))
	
			observer.observe(document.head, {
				attributes: true
			})
		})
	}
	
	async function insertScripts(){
		if(!document.head) return
	
		document.removeEventListener("DOMSubtreeModified", insertScripts)
	
		insertHead("script", "Global.js")
		
		await waitForGlobalScript()
		if(testPath(brainlyDetails[location.hostname].question)) insertHead("script", "Tasks.js")
		if(testPath("messages")) insertHead("script", "Messages.js")
		if(testPath("tasks", "archive_mod")) insertHead("script", "ModerateAll.js")
	}
	
	function setStorage(key, value){
		return new Promise(resolve => chrome.storage.sync.set({[key]: value}, resolve))
	}
	
	async function getStorage(key){
		const values = await new Promise(resolve => chrome.storage.sync.get(key, resolve))
		return values[key]
	}

	document.head ? insertScripts() : document.addEventListener("DOMSubtreeModified", insertScripts)
		
	getStorage("darkTheme").then(value => value && chrome.runtime.sendMessage({ action: "insertDarkTheme" }))
	getStorage("expandLayout").then(value => value && chrome.runtime.sendMessage({ action: "expandLayout" }))

	window.addEventListener("BrainlyEnhancer", /** @param {any} e */ async e => {
		if(!e.detail) throw new Error("details is not defined")
		const { action } = e.detail.data
	
		let returnValue
		if(action === "toggleDarkTheme") returnValue = await new Promise(async resolve => resolve(await setStorage("darkTheme", !(await getStorage("darkTheme")))))
		if(action === "getExpandedLayout") returnValue = await getStorage("expandLayout")
		if(action === "log") console.log(action.data)
	
		window.dispatchEvent(new CustomEvent("BrainlyEnhancerSender", { detail: {
			data: returnValue,
			requestId: e.detail.requestId
		}}))
	})
})();