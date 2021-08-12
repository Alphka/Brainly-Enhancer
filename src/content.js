const brainlyHostnames = [
	"brainly.com.br",
	"brainly.com",
	"brainly.ph",
	"brainly.co.id",
	"brainly.ro",
	"eodev.com",
	"brainly.lat",
	"znanija.com",
	"brainly.pl",
	"brainly.in",
	"nosdevoirs.fr"
]

function waitElement(selector, max){
	const begin = Date.now()
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			const element = document.querySelector(selector)
			if(element){
				resolve(element)
				clearInterval(interval)
			}else if(max && Date.now() - begin > max) reject()
		}, 10)
	})
}

if(brainlyHostnames.includes(location.hostname)){
	Object.getOwnPropertyNames(localStorage).forEach(name => name.includes("funnel") && localStorage.removeItem(name))

	if(!document.cookie.includes("cookieconsent_dismissed")) document.cookie = "cookieconsent_dismissed=yes; max-age=31536000; path=/; samesite=Lax"
	
	if(!localStorage.getItem("registration-toplayer/expires")){
		localStorage.setItem("registration-toplayer/expires", Date.now() + 3.6e6)
		localStorage.setItem("registration-toplayer/cursor", 0)
	}

	if(location.hostname === "nosdevoirs.fr" && !localStorage.getItem("truste.eu.cookie.notice_preferences")){
		let date = new Date()
		date.setFullYear(date.getFullYear() + 1)
		date = date.getTime()

		localStorage.setItem("notice_preferences", "2:")
		localStorage.setItem("notice_gdpr_prefs", "0,1,2:")
		localStorage.setItem("truste.eu.cookie.notice_preferences", `{"name":"truste.eu.cookie.notice_preferences","value":"2:","path":"/","expires":${date}}`)
		localStorage.setItem("truste.eu.cookie.notice_gdpr_prefs", `{"name":"truste.eu.cookie.notice_gdpr_prefs","value":"0,1,2:","path":"/","expires":${date}}`)
		localStorage.setItem("truste.eu.cookie.cmapi_cookie_privacy", `{"name":"truste.eu.cookie.cmapi_cookie_privacy","value":"permit 1,2,3","path":"/","expires":${date}}`)
		localStorage.setItem("truste.eu.cookie.cmapi_gtm_bl", `{"name":"truste.eu.cookie.cmapi_gtm_bl","value":"","path":"/","expires":${date}}`)
	}

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
		"div#new-ad-placeholder-question-desktop",
		"div.brn-ads-box",
		"div.js-react-registration-toplayer",
		"div[class*=SubscriptionInfo__container]",
		"div.truste_overlay",
		"div.truste_box_overlay_inner",
		"div.truste_box_overlay"
	],
	bodyMutation = new MutationObserver((mutations, observer) => {
		mutations.forEach(mutation => {
			if(mutation.type === "attributes"){
				if(mutation.attributeName === "style" && document.body.style.overflow) document.body.style.overflow = "auto"
			}else selectors.forEach(selector => {
				const elements = document.querySelectorAll(selector)
				if(elements.length) Array.from(elements).forEach(element => element.remove())
			})
		})
	})
	
	bodyMutation.observe(document.body, {
		attributes: true,
		childList: true,
		subtree: true
	})

	waitElement("div.sg-overlay.sg-overlay--dark").then(element => element.remove())
}