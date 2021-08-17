const ContentScript = (function(){
	let requestId = 0

	function executeAction(data){
		const id = requestId++
		return new Promise(resolve => {
			var listener = e => e.detail.requestId === id && (
				window.removeEventListener("BrainlyEnhancerSender", listener),
				resolve(e.detail.data)
			)
			
			window.addEventListener("BrainlyEnhancerSender", listener)
			window.dispatchEvent(new CustomEvent("BrainlyEnhancer", { detail: {
				data,
				requestId: id
			}}))
		})
	}

	return { executeAction }
})();

window.ContentScript = ContentScript

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
	waitElement(selector, multiple = false, element){
		element = element || document
		return new Promise(resolve => {
			const interval = setInterval(() => element.querySelector(selector) && (
				clearInterval(interval),
				resolve(multiple ? element.querySelectorAll(selector) : element.querySelector(selector))
			))
		})
	},
	waitObject(object){
		return new Promise(resolve => {
			const interval = setInterval(() => {
				const element = eval(object)
				if(element){
					clearInterval(interval)
					resolve(element)
				}
			})
		})
	},
	log(...args){
		if(!args || !args.length) return
		
		args.every(arg => typeof arg === "string")
			? console.log("%c" + args.join(" "), "color: #3371ff; font-size:15px;")
			: args.every(arg => arg instanceof Error)
			? console.error(...args)
			: console.log(...args)
	},
	async request(url, method = "GET", data, headers = {}){
		Object.assign(headers, { "Content-Type": "application/json" })

		const response = await fetch(url, {
			headers,
			method,
			body: data ? JSON.stringify(data) : null
		}),
		text = await response.text()

		try{
			return JSON.parse(text)
		}catch(error){
			return text
		}
	},
	toBackground(data){
		return new Promise((resolve, reject) => chrome.runtime.sendMessage(this.extensionId, data, response => {
			response.success ? resolve(response) : reject(response)
		}))
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
		"div.js-react-kodiak-banner-top",
		"div.section--lnnYy.section--9DHSr"
	]
}

document.head.dataset.beLoaded = "true"

// Remove Brainly Plus configuration
Object.getOwnPropertyNames(localStorage).forEach(name => name.includes("funnel") && localStorage.removeItem(name))

localStorage.setItem("registration-toplayer/expires", String(Date.now() + 3.6e6))
localStorage.setItem("registration-toplayer/cursor", "0")
localStorage.setItem("spotlight-notifications/achievements", "\"dismissed\"")

const date = new Date()
date.setFullYear(date.getFullYear() + 1)

document.cookie = `cookieconsent_dismissed=yes; max-age=${date.getTime()}; path=/; samesite=Lax`

if(location.hostname === "nosdevoirs.fr"){
	localStorage.setItem("notice_preferences", "2:")
	localStorage.setItem("notice_gdpr_prefs", "0,1,2:")
	localStorage.setItem("truste.eu.cookie.notice_preferences", `{"name":"truste.eu.cookie.notice_preferences","value":"2:","path":"/","expires":${date.getTime()}}`)
	localStorage.setItem("truste.eu.cookie.notice_gdpr_prefs", `{"name":"truste.eu.cookie.notice_gdpr_prefs","value":"0,1,2:","path":"/","expires":${date.getTime()}}`)
	localStorage.setItem("truste.eu.cookie.cmapi_cookie_privacy", `{"name":"truste.eu.cookie.cmapi_cookie_privacy","value":"permit 1,2,3","path":"/","expires":${date.getTime()}}`)
	localStorage.setItem("truste.eu.cookie.cmapi_gtm_bl", `{"name":"truste.eu.cookie.cmapi_gtm_bl","value":"","path":"/","expires":${date.getTime()}}`)
}

async function watchForAds(){
	const { selectors } = BrainlyEnhancer
	if(!document.body) await new Promise(resolve => window.addEventListener("DOMContentLoaded", resolve));

	(new MutationObserver((mutations, observer) => mutations.forEach(mutation => {
		if(mutation.type === "attributes" && mutation.attributeName === "style"){
			const style = document.body.style,
			computedStyle = window.getComputedStyle(document.body)

			if([style.overflowY, computedStyle.overflowY].includes("hidden")) style.overflowY = "auto"
			if([style.position, computedStyle.position].includes("fixed")) style.position = "initial"
			return
		}

		for(const selector of selectors){
			const elements = document.querySelectorAll(selector)
			if(elements.length) for(const element of Array.from(elements)) element.remove()
		}
	}))).observe(document.body, {
		attributes: true,
		childList: true,
		subtree: true
	})
}

async function appendDarkThemeIcon(){
	const { waitElement, createElement, log, extensionId } = BrainlyEnhancer
	const image = `chrome-extension://${extensionId}/src/images/moon.png`

	let button
	if(document.documentElement.id === "html"){ // Old design
		const li = createElement("li", {
			class: "menu-element",
			children: [
				button = createElement("a", {
					"data-track": "brainly-enhancer-dark-theme-icon",
					textContent: "Dark theme",
					href: "javascript:void(0)"
				})
			]
		})
		
		document.head.appendChild(createElement("style", {
			innerHTML: `.menu-element > a[data-track="brainly-enhancer-dark-theme-icon"]::before{background-image: url(${image});}`
		}));

		(await waitElement(".mint-header__right.mint-hide-for-mobile.menu-right > ul.menu-list")).firstElementChild.before(li)
	}else{
		const container = await waitElement("div[class*=HeaderController__childrenWrapper] > div > div:nth-of-type(2) > div"),
		div = createElement("div", {
			class: "sg-flex",
			children: [
				button = createElement("button", {
					class: "sg-button sg-button--m sg-button--transparent sg-button--icon-only",
					children: [
						createElement("span", {
							class: "sg-button__icon sg-button__icon--m",
							children: [
								createElement("div", {
									class: "sg-icon sg-icon--adaptive sg-icon--x24",
									children: [
										createElement("img", {
											class: "sg-icon__svg",
											src: image
										})
									]
								})
							]
						})
					]
				})
			]
		})

		container.firstElementChild.classList.add("sg-flex--margin-left-s")
		container.firstElementChild.before(div)
	}

	button.addEventListener("click", async e => {
		ContentScript.executeAction({ action: "toggleDarkTheme" })
		location.reload()
	}, { once: true })
}

BrainlyEnhancer.waitElement("head[data-brainly-enhancer-id]").then(async () => {
	BrainlyEnhancer.extensionId = document.head.dataset.brainlyEnhancerId
	document.head.removeAttribute("data-brainly-enhancer-id")

	await BrainlyEnhancer.waitObject("window.dataLayer")
	if(window.dataLayer[0].user.isLoggedIn) appendDarkThemeIcon()
})

watchForAds()