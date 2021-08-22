import BrainlyEnhancer from "../src/controllers/BrainlyEnhancer"
import { jsData, myData, __default_config } from "./brainly"

export type onMessageAction =
	| "insertDarkTheme"
	| "expandLayout"
	| "setDarkTheme"
	| "setExpandLayout"
	| "isContentScriptInjected"
	| "setExtensionData"
	| "setStorage"
	| "getStorage"

export type StorageTypes =
	| "local"
	| "sync"

export interface onMessageInformation {
	action: onMessageAction
	data?: any
}

declare type Zadanium = {
	[property: string]: any
}

type dataLayer = [
	{
		user: {
			isLoggedIn: boolean
			nick?: string
			id?: number
			idWithMarket?: string
			guestToken?: string
			hasBeenLogged?: "L"
			gender?: 1 | 2
			entry?: 0 | 1
			emailConfirmed?: boolean
			getsPaywall?: boolean
			answererLevel?: "STRONG" | "LURKER" 
			numberOfAnswers?: number
			accountType?: "student" | "parent"
			isOnTrial?: boolean
			isSubscriber?: boolean
			gracePeriodActive?: boolean
			lastAnswerDate?: null
		}
		event: "FillDataLayer"
		moduloExperiments?: any[]
	},
	{
		"gtm.start": number
		event: "gtm.js"
	},
	...any[]
]

declare global {
	var Zadanium: Zadanium
	var BrainlyEnhancer: BrainlyEnhancer
	var myData: myData
	var __default_config: __default_config
	var dataLayer: dataLayer
	var jsData: jsData

	interface Window {
		Zadanium: Zadanium
		BrainlyEnhancer: BrainlyEnhancer
		myData: myData
		__default_config: __default_config
		dataLayer: dataLayer
		jsData: jsData
	}
}

declare module "*.html" {
	const content: string
	export default content
}
