import ext from "webextension-polyfill"

interface __default_config {
	MARKET: string
	inner: {
		DEBUG: boolean
		TOKEN_LONG: string
		TOKEN_LONG_COOKIE: string
		INFOBAR_COOKIE: string
		RELEASE: string
	}
	locale: {
		COUNTRY: string
		OFFSET: string
	}
	user: {
		ME: string
		ME_additionalData: {
			isModerator: boolean
			isFreelancer: boolean
			accountType: string
		}
		BAN: string
		ACTIVATED: boolean
		myObject: {
			panel: {
				messages: {
					count: number
					status: number
				}
				notifications: {
					count: number
					status: number
				}
				invitations: {
					count: number
					status: number
				}
			}
			user: {
				id: number
				nick: string
				gender: number
				points: number
				ranks: {
					color: string
					names: string[]
					count: number
				}
				ranksIds: number[]
				fbId: null
				activated: string
				language: string
				isoLocale: string
				gradeId: number
				username: string
				registrationDatetime: string
				isDeleted: boolean
				primaryRankId: number
				avatarId: number
				category: number
				clientType: number
				modActionsCount: number
				avatars: {
					64: string
					100: string
				}
				avatar: string
				entry: null
				isModerator: boolean
				isFreelancer: boolean
				accountType: string
			}
			preferences: {
				stream: {
					subjectIds: number[]
					gradeIds: number[]
				}
			}
			auth: {
				comet: {
					hash: string
					authHash: string
					avatarUrl: string
				}
			}
			privileges: number[]
			ban: {
				active: boolean
				expires: null
			}
			tasks: number
			responses: number
			comments: number
			conversationsNotRead: any[]
			userCategory: number
			currentBestAnswers: number
			subscription: null
			brainlyPlus: {
				subscription: null
				trialAllowed: boolean
			}
		}
	}
	comet: {
		HASH: string
		AUTH_HASH: string
	}
	parameters: {
		TEX_SERVICE_URL: string
		SITE_DOMAIN: string
	}
	storage: {
		CACHE_MINUTES: number
	}
	soa_versioning: {
		cake: string
	}
	tracking: {
		TIMEOUT: number
	}
	constants: {
		model_type: {
			TASK: number
			RESPONSE: number
			COMMENT: number
			USER: number
		}
		moderation: {
			PROLONG_TIMES: number[]
		}
		api: {
			TIMEOUT: number
			TOKEN_LONG_TTL: string
		}
		assets: {
			ASSETS_BASE_URL: string
		}
		privileges: {
			CAN_CONFIRMATION_CONTENT: boolean
			CAN_CONFIRMATION_CONTENT_MODERATE: boolean
		}
		DYNAMIC_TIME_UPDATE: number
		MAX_ATTACHMENTS: string
	}
	endpoints: {
		URL: string
		DATA: {
			cake: {
				name: string
				uri: string
				protocol: string
			}[]
		}
	}
	config: {
		protocol: string
		impl: string
		schema: string
		success: boolean
		data: {
			config: {
				rulesLastChanged: string
				rulesInfoChanged: number
				minTaskPoints: number
				maxTaskPoints: number
				patronageEnabled: number
				streamTaskSourceInfoVersion: number
				serviceLatexUrlHttp: string
				serviceLatexUrlHttps: string
				attachmentCount: number
				moderationForumAddress: string
				moderationTicketProlongTime: string
				footerAnalyticsId: string
				enableJobOffersLink: number
				maxCommentLength: number
				ageLimit: number
				pmsMinAnswersAdded: number
				contentConfirmationEnabled: boolean
				timezone: string
				cometWebsocketEnabled: number
				cometSslServerAddress: string
				cometSslServerPort: number
				cometServerAddress: string
				cometServerPort: number
				cometSubscribeMaxTaskAge: number
				cometEnabled: number
				cometConnectionTimeout: number
				cometDefaultProtocol: string
				cometDebuggerEnabled: boolean
				faqPageAddress: string
				startingPoints: number
				nearestExamModes: {
					startDateTime: string
					endDateTime: string
					country: null
				}[]
			}
			subjects: {
				id: number
				name: string
				icon: string
				slug: string
				rankable: string
				best_in_name: string
				filter_name: string
				enabled: boolean
				occupants: number
			}[]
			grades: {
				id: number
				name: string
				slug: string
				icon: string
				filter_name: string
			}[]
			rankings: {
				id: number
				name: string
			}[]
			stats: {
				name: string
				value: number
			}[]
			ranks: {
				id: number
				name: string
				description: string
				type: number
				the_best_resps: number
				points: number
				promoted_text: string
				color: string
			}[]
		}
		validated: boolean
	}
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

interface waitElementOptions {
	/** Time in milliseconds until the Promise is rejected */
	max?: number
	/** Whether use `querySelector` or `querySelectorAll` */
	multiple?: boolean
}

interface createElementOptions {
	[attribute: string]: any
	children?: HTMLElement[]
}

interface BrainlyEnhancer {
	/** Returns a Promise that is resolved when the element is found */
	waitElement<K extends keyof HTMLElementTagNameMap>(selector: K, multiple?: false, element?: HTMLElement | Element): Promise<HTMLElementTagNameMap[K]>
	waitElement<K extends keyof HTMLElementTagNameMap>(selector: K, multiple?: true, element?: HTMLElement | Element): Promise<NodeListOf<HTMLElementTagNameMap[K]>>
	waitElement(selector: string, multiple?: false, element?: HTMLElement | Element): Promise<ReturnType<typeof document.querySelector>>
	waitElement(selector: string, multiple?: true, element?: HTMLElement | Element): Promise<ReturnType<typeof document.querySelectorAll>>

	waitObject(object: string): Promise<any>

	/** Creates an element using `document.createElement` */
	createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: createElementOptions): HTMLElementTagNameMap[K]
	createElement<K extends keyof HTMLElementTagNameMap>(options: createElementOptions & {
		tagName: K
	}): HTMLElementTagNameMap[K]

	/** Verifies inside Brainly if the user has a privilege */
	checkPrivileges(...ids: number[]): boolean

	/** Logs messages or errors into `console` */
	log(...args: any[]): void

	/** Requests the page and returns its response */
	request(url: string, method?: string, data?: object, headers?: HeadersInit): Promise<any>

	/**
	 * Sends message to background.js
	 * 
	 * Requires `this`
	*/
	toBackground(data: any): Promise<any>

	/** CSS selectors of elements to be removed */
	selectors: string[]

	/** Information of delete reasons */
	moderationData?: any

	extensionId?: string
}

declare global {
	var __default_config: __default_config
	var dataLayer: dataLayer
	var BrainlyEnhancer: BrainlyEnhancer
	var chrome: any // typeof ext

	interface Window {
		__default_config: __default_config
		dataLayer: dataLayer
		BrainlyEnhancer: BrainlyEnhancer
		chrome: any // typeof ext
		Zadanium?: any
		ContentScript: {
			executeAction(data: any): Promise<any>
		}
	}
}

type QuickButtonPreference = {
	category: number
	subCategory: number
}

type QuickButtonTypes = "task" | "response"

type QuickButtonReason = {
	id: number
	text: string
	abuse_category_id: number
	subcategories: {
		id: number
		title: string
		text: string
	}[]
}

export interface QuickButtonPreferences {
	/** Whether the extension database was requested */
	requested: boolean
	/** Response from extension's database */
	response?: any
	maxButtons: number
	getLocalStorage(): string
	hasPreferences(): boolean
	getPreferences(type: QuickButtonTypes): Promise<QuickButtonPreference[]>
	readonly defaultPreferences: Promise<{
		[type in QuickButtonTypes]: QuickButtonPreference[]
	}>
}

export class QuickButton {
	id: number
	index: number
	type: QuickButtonTypes
	container: HTMLDivElement
	maxButtons: number
	preferences: QuickButtonPreference[]
	readonly button: Promise<HTMLButtonElement>
	
	constructor(type: QuickButtonTypes, id: string | number, container: HTMLDivElement)
	getReasonDetails(id: number): Promise<QuickButtonReason>
	createButton(preference: QuickButtonPreference, reason: QuickButtonReason): HTMLButtonElement
}