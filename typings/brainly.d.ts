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
				avatars: Avatar
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

type Attachment = {
	full: string
	thumbnail: string
	type: string
	size: number
	hash: string
	id: number
	extension: string
}

type Solved = {
	id: number
	nick: string
	avatar: string
}

type Presence = {
	observing: any[]
	answering: any[]
	solved: Solved[]
	tickets: any[]
}

interface MainViewSettings {
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

interface MainViewSettings {
	can_comment: boolean
	can_edit: boolean
	can_mark_abuse: boolean
	can_moderate: boolean
	is_confirmed: boolean
	is_deleted: boolean
	is_marked_abuse: boolean
}

interface MainViewAnswerSettings extends MainViewSettings {
	can_mark_as_best: boolean
	is_excellent: boolean
	is_to_correct: boolean
}

interface MainViewQuestionSettings extends MainViewSettings {
	can_follow: boolean
	can_unfollow: boolean
	is_answer_button: boolean
	is_closed: boolean
	is_following: boolean
}

type Approved = {
	date?: string
	approver?: Approver
}

type Avatar = {
	64: string
	100: string
}

type Ranks = {
	color: string
	names: string[]
	count: number
}

type Stats = {
	questions: number
	answers: number
	comments: number
}

type Points = {
	ptsForTask: number
	ptsForResp: number
	ptsForBest: number
}

type ApprovedData = {
	date?: string
	approver?: {
		avatars: Avatar
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
	settings: MainViewSettings
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

export interface QuestionMainViewAnswerData {
	id: number
	user_id: number
	task_id: number
	points: number
	created: string
	content: string
	mark: number
	marks_count: number
	thanks: number
	user_best_rank_id: number
	source: string
	client_type: string
	best: boolean
	settings: MainViewAnswerSettings
	attachments: Attachment[]
	approved: Approved
	comments: Comments
}

export interface QuestionMainViewUserData {
	id: number
	nick: string
	gender: number
	is_deleted: boolean
	stats: Stats
	avatars: Avatar
	avatar: Avatar
	ranks: Ranks
	ranks_ids: number[]
}

export interface QuestionMainViewQuestionData {
	id: number
	subject_id: number
	user_id: number
	grade_id: number
	points: Points
	content: string
	created: string
	responses: number
	tickets: number
	first_resp: string
	the_best_resp_id: any
	source: string
	client_type: string
	user_category: number
	settings: MainViewQuestionSettings
	attachments: Attachment[]
	comments: Comments
}

export interface QuestionMainViewData {
	task: QuestionMainViewQuestionData
	responses: QuestionMainViewAnswerData[]
	presence: Presence
}

export interface GenericResponseBrainly {
	success: boolean
	message?: string
	code?: number
	exception_type?: number
	data?: any
	users_data?: any
	validated: boolean
	impl: string
	protocol: "28"
	schema: string
}

export type BrainlyActionData = {
	model_id: number
	reason_id?: number
	reason?: string
	model_type_id?: number
	/** Default: `false` */
	give_warning?: boolean
	/** Default: `true` */
	take_points?: boolean
	/** Default: `false` */
	return_points?: boolean
	taskId?: number
}

interface GetUserByIdData {
	avatar: {
		medium: string
		small: string
	} | null
	avatar_id: number | null
	category: number
	client_type: number
	current_best_answers_count: number
	gender: number
	id: number
	is_deleted: boolean
	nick: string
	points: number
	primary_rank_id: number
	ranks_ids: number[]
	registration_date: string
}

interface GetAnswersByIdResponse extends GenericResponseBrainly{
	data: {
		id: number
		author_id: number
		question_id: number
		content: string
		points: number
		thanks_count: number
		rating: number
		rates_count: number
		is_confirmed: boolean
		is_excellent: boolean
		is_best: boolean
		can_comment: boolean
		attachment_ids: any[],
		created: string
	}[]
	pagination: {
		first: string
		prev?: string
		self: string
		next?: string
		last: string
	}
}

interface GraphQLAuthor {
	avatar: {
		thumbnailUrl: string
		__typename: "Attachment"
	}
	databaseId: number
	nick: string
	__typename: "User"
}

interface GetQuestionsByIdResponse extends GenericResponseBrainly {
	data: {
		userById: {
			questions: {
				edges: {
					node: {
						answers: {
							nodes: {
								author: GraphQLAuthor
								__typename: "Answer"
							}[]
							__typename: "AnswerConnection"
						}
						attachments: any[]
						author: GraphQLAuthor
						canBeAnswered: boolean
						content: string
						created: string
						databaseId: number
						grade: {
							name: string
							slug: string
							__typename: "Grade"
						}
						subject: {
							name: string
							slug: string
							__typename: "Subject"
						}
						__typename: "Question"
					}
					__typename: "QuestionEdge"
				}[]
				pageInfo: {
					endCursor: string
					hasNextPage: boolean
					__typename: "PageInfo"
				}
				__typename: "UserQuestionsConnection"				
			}
			__typename: "User"
		}
	}
}
