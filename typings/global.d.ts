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

interface BrainlyEnhancer {
	waitElement(selector: string, max?: number): Promise<HTMLElement>
	createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: Object): HTMLElementTagNameMap[K]
	createElement<E extends Element = Element>(options: { tagName: string }): E
	checkPrivileges(...ids: number[]): boolean
	selectors: string[]
}

declare global {
	var __default_config: __default_config
	var BrainlyEnhancer: BrainlyEnhancer
	var chrome: any
	var dataLayer: any

	interface Window {
		__default_config: __default_config
		BrainlyEnhancer: BrainlyEnhancer;
		chrome: any
		dataLayer: any[]
	}
}

export {}