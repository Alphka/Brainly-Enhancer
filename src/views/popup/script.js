function setStorage(key, value){
	return new Promise(resolve => chrome.storage.sync.set({[key]: value}, resolve))
}

async function getStorage(key){
	const values = await new Promise(resolve => chrome.storage.sync.get(key, resolve))
	return values[key]
}

function setDarkTheme(e){
	return setStorage("darkTheme", this.checked)
}

function setExpandLayout(e){
	return setStorage("expandLayout", this.checked)
}

window.addEventListener("DOMContentLoaded", async () => {
	document.querySelector("#main > header > h1").textContent = document.title
	
	const darkThemeInput = document.querySelector("input[name=darkTheme]")
	darkThemeInput.checked = await getStorage("darkTheme")
	darkThemeInput.addEventListener("change", setDarkTheme)

	const expandLayoutInput = document.querySelector("input[name=expandLayout]")
	expandLayoutInput.checked = await getStorage("expandLayout")
	expandLayoutInput.addEventListener("change", setExpandLayout)
})