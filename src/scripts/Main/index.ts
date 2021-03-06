import type { onMessageAction } from "../../../typings/global"
import DarkTheme from "./DarkThemeIcon"
import { waitForBody } from "../../helpers"
import { BrainlyEnhancer as _BrainlyEnhancer, PreventConsolePreventer } from "../../controllers"

let BrainlyEnhancer: _BrainlyEnhancer

class Main {
	selectors: string[]
	adsListener!: MutationObserver
	DarkTheme: DarkTheme

	constructor(){
		BrainlyEnhancer = new _BrainlyEnhancer()
		window.BrainlyEnhancer = BrainlyEnhancer

		this.DarkTheme = new DarkTheme()

		this.selectors = [
			`div.section--lnnYy.section--3Yobl`,
			`div[class*=payments-section]`,
			`div.brn-cookie-policy-dialog`,
			`div.js-react-bottom-banner`,
			`div.js-react-payments-in-toplayer`,
			`div.js-react-brainly-plus-box-aside`,
			`div.brn-new-ad-placeholder--for-desktop-and-up`,
			`div.brn-bottom-toplayer`,
			`div[data-testid="brainly_plus_toaster_wrapper"]`,
			`button[data-test="navigation_payments"]`,
			`div.brn-brainly-plus-box`,
			`div#new-ad-placeholder-question-desktop`,
			`div.js-react-registration-toplayer`,
			`div[data-testid="registration_toplayer"`,
			`div[class*=SubscriptionInfo__container]`,
			`div.truste_overlay`,
			`div.truste_box_overlay_inner`,
			`div.truste_box_overlay`,
			`div.js-react-kodiak-banner-top`,
			`div.section--lnnYy.section--9DHSr`,
			`div[class*="OneOffAchievementTooltip-module__tooltip"]`,
			`.js-message-box .sg-hide-for-small-only`
		]

		this.Init()
	}
	async Init(){
		this.setBrainlyPreferences()

		await this.setExtensionData()
		await waitForBody()
		this.watchForAds()
		this.InitSections()
	}
	setBrainlyPreferences(){
		const date = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
		if(!document.cookie.includes("cookieconsent_dismissed")) document.cookie = `cookieconsent_dismissed=yes; expires=${date.toUTCString()}; path=/; samesite=Lax`

		const setLocalStorage = (key: string, value: string) => !localStorage.getItem(key) && localStorage.setItem(key, value)

		if(location.hostname === "nosdevoirs.fr"){
			const time = date.getTime()
			setLocalStorage("notice_preferences", "2:")
			setLocalStorage("notice_gdpr_prefs", "0,1,2:")
			setLocalStorage("truste.eu.cookie.notice_preferences", `{"name":"truste.eu.cookie.notice_preferences","value":"2:","path":"/","expires":${time}}`)
			setLocalStorage("truste.eu.cookie.notice_gdpr_prefs", `{"name":"truste.eu.cookie.notice_gdpr_prefs","value":"0,1,2:","path":"/","expires":${time}}`)
			setLocalStorage("truste.eu.cookie.cmapi_cookie_privacy", `{"name":"truste.eu.cookie.cmapi_cookie_privacy","value":"permit 1,2,3","path":"/","expires":${time}}`)
			setLocalStorage("truste.eu.cookie.cmapi_gtm_bl", `{"name":"truste.eu.cookie.cmapi_gtm_bl","value":"","path":"/","expires":${time}}`)
		}

		setLocalStorage("registration-toplayer/expires", String(Date.now() + 3.6e6))
		setLocalStorage("registration-toplayer/cursor", "0")
		setLocalStorage("spotlight-notifications/achievements", "\"dismissed\"")
		setLocalStorage("spotlight-notifications/achievements-badges", "\"dismissed\"")

		Object.getOwnPropertyNames(localStorage).forEach(name => name.includes("funnel") && localStorage.removeItem(name))
	}
	watchForAds(){
		this.adsListener = new MutationObserver((mutations, observer) => {
			mutations.forEach(mutation => {
				if(mutation.type === "attributes" && mutation.attributeName === "style"){
					const style = document.body.style,
					computedStyle = window.getComputedStyle(document.body)

					if([style.overflowY, computedStyle.overflowY].includes("hidden")) style.overflowY = "auto"
					if([style.position, computedStyle.position].includes("fixed")) style.position = "initial"
					return
				}
			})

			for(const selector of this.selectors){
				const elements = document.querySelectorAll(selector)
				if(elements.length) for(const element of Array.from(elements)) element.remove()

				const BrainlyPlusOverlay = document.querySelector("div[class*=OfferModal__toplayer]") as HTMLDivElement

				if(BrainlyPlusOverlay){
					if(BrainlyPlusOverlay.classList.contains("sg-overlay")) BrainlyPlusOverlay.remove()
					else if(BrainlyPlusOverlay.parentElement?.classList.contains("sg-overlay")) BrainlyPlusOverlay.parentElement.remove()
					else BrainlyPlusOverlay.parentElement?.parentElement?.remove()
				}
			}
		})

		this.adsListener.observe(document.body, {
			attributes: true,
			childList: true,
			subtree: true
		})
	}
	setExtensionData(){
		return new Promise<void>(resolve => {
			var listener = function(e: MessageEvent){
				if(!e) return

				const action: onMessageAction = e.data.action

				if(action === "setExtensionData"){
					window.BrainlyEnhancer.extension = e.data.data
					window.removeEventListener("message", listener)
					resolve()
				}
			}

			window.addEventListener("message", listener)
			window.dispatchEvent(new CustomEvent("getExtensionData"))
		})
	}
	async InitSections(){
		if(!(await BrainlyEnhancer.isLogged)) return

		this.DarkTheme.AppendIcon()

		if(await BrainlyEnhancer.isModerator) this.ModerationTools()
	}
	ModerationTools(){

	}
}

new Main()
new PreventConsolePreventer()
