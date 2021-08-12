function waitElement(selector, max){
	const begin = Date.now()
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			const element = document.querySelector(selector)
			if(element){
				resolve(element)
				clearInterval(interval)
			}else if(max && Date.now() - begin > max) reject()
		})
	})
}

if(location.hostname === "brainly.com.br"){
	const selectors = [
		"div.section--lnnYy.section--3Yobl",
		"div[class*=payments-section]",
		"div.brn-cookie-policy-dialog",
		"div.js-react-bottom-banner",
		"div.js-react-payments-in-toplayer",
		"div.js-react-brainly-plus-box-aside",
		"div.brn-new-ad-placeholder--for-desktop-and-up",
		"div.brn-bottom-toplayer",
		"div.sg-overlay.sg-overlay--dark",
		"div[data-testid=\"brainly_ads_placeholder\"]",
		"div.js-react-answers div[data-testid=\"brainly_ads_placeholder\"]",
		"div[data-testid=\"brainly_plus_toaster_wrapper\"]",
		"button[data-test=\"navigation_payments\"]",
		"div.brn-brainly-plus-box",
		"div#new-ad-placeholder-question-desktop"
	]

	selectors.forEach(selector => waitElement(selector, 1e4).then(element => element.remove()).catch(() => {}))
	Object.getOwnPropertyNames(localStorage).forEach(name => name.includes("funnel") && localStorage.removeItem(name))

	if(!document.cookie.includes("cookieconsent_dismissed")) document.cookie = "cookieconsent_dismissed=yes; max-age=31536000; path=/; samesite=Lax"
	if(!localStorage.getItem("registration-toplayer/expires")){
		localStorage.setItem("registration-toplayer/expires", Date.now())
		localStorage.setItem("registration-toplayer/cursor", 0)
	}
}