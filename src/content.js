(function(){
	if(document.body && document.body.dataset.beLoaded) return

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
	
	function testPath(...paths){
		const pathname = location.pathname.substr(1).split("/")
		return paths.toString() === pathname.slice(0, paths.length).toString()
	}
	
	function insertHead(tagName, fileName){
		const element = document.createElement(tagName),
		extension = `chrome-extension://${chrome.runtime.id}`
	
		switch(tagName){
			case "script":
				element.src = `${extension}/src/scripts/${fileName}`
				element.type = "text/javascript"
			break
			case "style":
				element.href = `${extension}/src/styles/${fileName}`
				element.rel = "stylesheet"
			break
			default: throw new ReferenceError("tagName not allowed: " + tagName)
		}
	
		document.head.appendChild(element)
	}

	async function insertScripts(){
		insertHead("script", "Global.js")
		
		await new Promise(resolve => {
			var watchBody = new MutationObserver(() => document.body.dataset.beLoaded === "true" && (
				watchBody.disconnect(),
				resolve()
			))
	
			watchBody.observe(document.body, { attributes: true })
		})
		
		const currentBrainly = brainlyDetails[location.hostname]
		if(testPath(currentBrainly.question)) insertHead("script", "Tasks.js")
		if(testPath("messages")) insertHead("script", "Messages.js")
	}
	
	window.addEventListener("DOMContentLoaded", () => Object.getOwnPropertyNames(brainlyDetails).includes(location.hostname) && insertScripts())
})()