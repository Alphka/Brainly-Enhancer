import manifestInfo from "../../../build/manifest.json"

window.addEventListener("DOMContentLoaded", async () => {
	document.title = document.querySelector("#main > header > h1").textContent = manifestInfo?.name || "DEV"
	
	const darkThemeInput = document.querySelector("input[name=darkTheme]")
	const expandLayoutInput = document.querySelector("input[name=expandLayout]")

	chrome.storage.local.get(["darkTheme", "expandLayout"], values => {
		const { darkTheme, expandLayout } = values

		darkThemeInput.checked = Boolean(darkTheme)
		expandLayoutInput.checked = Boolean(expandLayout)
	})

	darkThemeInput.addEventListener("change", () => chrome.runtime.sendMessage({
		action: "setDarkTheme",
		data: darkThemeInput.checked
	}))

	expandLayoutInput.addEventListener("change", () => chrome.runtime.sendMessage({
		action: "setExpandLayout",
		data: expandLayoutInput.checked
	}))
})
