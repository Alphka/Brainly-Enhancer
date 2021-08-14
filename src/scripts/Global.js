window.BrainlyEnhancer = {
	checkPrivileges(...ids){
		if(!window.dataLayer[0].user.isLoggedIn) return false
		if(!window.__default_config) throw new ReferenceError("default config is not defined")
		const userData = JSON.parse(__default_config.user.ME)
		return ids.filter(id => userData.privileges.includes(id)).length === ids.length
	},
	createElement(args){
		let element, options
		
		if(typeof args === "string"){
			element = document.createElement(args)
			options = arguments[1] || {}
		}else if(typeof args === "object"){
			element = document.createElement(args.tagName)
			options = args
			delete options.tagName
		}else throw new Error(`args cannot be a type of ${typeof args}`)
	
		if(options.textContent || options.innerText) element.textContent = options.textContent || options.innerText
		if(options.innerHTML) element.innerHTML = options.innerHTML
		if(options.children) options.children.forEach(child => element.appendChild(child))
		
		delete options.textContent
		delete options.innerText
		delete options.innerHTML
		delete options.children
	
		Object.getOwnPropertyNames(options).forEach(attribute => element.setAttribute(attribute, options[attribute]))
		return element
	},
	waitElement(selector, max){
		return new Promise((resolve, reject) => {
			const begin = Date.now(),
			interval = setInterval(() => {
				const element = document.querySelector(selector)
				if(element){
					// @ts-ignore
					resolve(element)
					clearInterval(interval)
				}else if(max && Date.now() - begin > max) reject()
			}, 10)
		})
	},
	selectors: [
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
		"div[data-testid=\"registration_toplayer\"",
		"div[class*=SubscriptionInfo__container]",
		"div.truste_overlay",
		"div.truste_box_overlay_inner",
		"div.truste_box_overlay",
		"div.sg-overlay.sg-overlay--dark"
	]
}

// Remove Brainly Plus configuration
Object.getOwnPropertyNames(localStorage).forEach(name => name.includes("funnel") && localStorage.removeItem(name))

// Remove cookie message
if(!document.cookie.includes("cookieconsent_dismissed")) document.cookie = "cookieconsent_dismissed=yes; max-age=31536000; path=/; samesite=Lax"

// Remove cookie message (for nosdevoirs)
if(location.hostname === "nosdevoirs.fr" && !localStorage.getItem("truste.eu.cookie.notice_preferences")){
	const date = new Date()
	date.setFullYear(date.getFullYear() + 1)

	localStorage.setItem("notice_preferences", "2:")
	localStorage.setItem("notice_gdpr_prefs", "0,1,2:")
	localStorage.setItem("truste.eu.cookie.notice_preferences", `{"name":"truste.eu.cookie.notice_preferences","value":"2:","path":"/","expires":${date.getTime()}}`)
	localStorage.setItem("truste.eu.cookie.notice_gdpr_prefs", `{"name":"truste.eu.cookie.notice_gdpr_prefs","value":"0,1,2:","path":"/","expires":${date.getTime()}}`)
	localStorage.setItem("truste.eu.cookie.cmapi_cookie_privacy", `{"name":"truste.eu.cookie.cmapi_cookie_privacy","value":"permit 1,2,3","path":"/","expires":${date.getTime()}}`)
	localStorage.setItem("truste.eu.cookie.cmapi_gtm_bl", `{"name":"truste.eu.cookie.cmapi_gtm_bl","value":"","path":"/","expires":${date.getTime()}}`)
}

// Watch page to remove ads
(new MutationObserver((mutations, observer) => mutations.forEach(mutation => {
	if(mutation.type === "attributes"){
		if(mutation.attributeName === "style" && document.body.style.overflow) document.body.style.overflow = "auto"
	}else BrainlyEnhancer.selectors.forEach(selector => {
		const elements = document.querySelectorAll(selector)
		if(elements.length) Array.from(elements).forEach(element => element.remove())
	})
}))).observe(document.body, {
	attributes: true,
	childList: true,
	subtree: true
})

document.body.setAttribute("data-be-loaded", "true")