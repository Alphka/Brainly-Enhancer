export type BrainlyHostnames = 
	| "brainly.com.br"
	| "brainly.lat"
	| "brainly.com"
	| "brainly.pl"
	| "eodev.com"
	| "nosdevoirs.fr"
	| "brainly.in"
	| "brainly.co.id"
	| "znanija.com"
	| "brainly.ro"
	| "brainly.ph"

export interface __default_config {
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

export interface AnswerDetails {
	databaseId: number
	user: {
		nick: string
		avatar: string
	}
	userId: number
	confirmed: boolean
	thanks: number
	rating: number
	attachments: {
		extension: string
		full: string
		hash: string
		id: number
		size: number
		thumbnail: string
		type: string
	}[]
}

export interface jsData {
	question: {
		author: {
			id: number
			nick: string
			avatar: string
		}
		subject: {
			databaseId: number
			name: string
		}
		grade: {
			databaseId: number
			name: string
		}
		isClosed: boolean
		isAnswerButton: boolean
		created: string
		databaseId: number
		attachments: {
			full: string
			thumbnail: string
			type: string
			size: number
			hash: string
			id: number
			extension: string
		}[]
		points: number
		pointsForBest: number
		approvedAnswersCount: number
		answers: AnswerDetails[]
		comments: {
			items: []
			lastId: number
			count: number
		}
	}
}

type Settings = {
	canMarkAsBest: boolean
	canEdit: boolean
	isToCorrect: boolean
	canMarkAbuse: boolean
	isMarkedAbuse: boolean
	canModerate: boolean
	isDeleted: boolean
	canComment: boolean
	isConfirmed: boolean
	isExcellent: boolean
}
  
type ApprovedData = {
	date?: string
	approver?: {
	  avatars: {
		64?: string
		100?: string
	  };
	  contentApprovedCount: number
	  gender: number
	  grade: number
	  id: number
	  nickname: string
	  points: number
	}
}
  
type Comments = {
	items: {
		id: number
		userId: number
		content: string
		created: string
		deleted: boolean
		canMarkAbuse: boolean
		isMarkedAbuse: boolean
	}[]
	lastId: number
	count: number
}
  
export type AnswerDataType = {
	id: number
	userId: number
	taskId: number
	points: number
	created: string
	content: string
	mark: number
	marksCount: number
	thanks: number
	userBestRankId?: number
	source: string
	clientType: string
	best: boolean
	settings: Settings
	attachments: any[]
	approved: Approved
	comments: Comments
}
  

export type QuestionDataType = {
	id: number
	content: string
	subject_id: number
	grade_id: number
	user_id: number
	created: string
	created_timestamp: number
	responses: AnswerDataType[]
	can_comment: boolean
	attachments: any[]
	is_deleted: boolean
	comments: Comments
	canMarkAbuse: boolean
	isMarkedAbuse: boolean
	canFollow: boolean
	canUnfollow: boolean
	isFollowing: boolean
	pointsForResponse: number
	pointsForBest: number
	approvedAnswersCount: number
	isAnswerButton: boolean
	canEdit: boolean
	tickets: any[]
}

export interface myData {
	[property: string]: any
}
