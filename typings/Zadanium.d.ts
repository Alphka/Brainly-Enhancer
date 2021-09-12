declare class init {
	0: HTMLDivElement
	context: Document
	length: number
	prevObject: init
	selector: string
}

interface User {
	avatar: {
		nick: string
		onerror: string
		src: string
		style: string
	}
	buddy: boolean
	id: number
	nick: string
	ranks: {
		color: string
		names: string[]
	}
	slug: string
	statistics: {
		removed_contents_count: number
		reports_count: number
		successfull_reports_count: number
		warnings_count: number
	}
	status?: any
}

interface ZadaniumContentObject {
	content_short: string
	created: string
	disabled: false
	grade: string
	grade_id: number
	model_id: number
	model_shortcut: string
	model_type_id: 1 | 2 | 45
	redirect: false
	report: {
		abuse: {
			category_id: number
			name: string
			subcategory_id: number
		}
		created: string
	}
	subject: string
	subject_id: 15
	taskUrl: string
	task_id: number
	ticket: false
	title: number
	to_correct: false
	user: User
}

interface Ref {
	createdObjects: ZadaniumContentObject[]
	data: {
		executed: false
		subscriptions: {}
	}
	events?: any
	execution: Function
	hashString: string
	improveSubscribtion: Function
	isGoodSubscribtionStructure: Function
	main: {
		[name: string]: Ref
	}
	makeObject: Function
	modifySubscribtionObject: Function
	rebuildObjectsTable: Function
	refs: {
		socket: Ref
		users: Ref
	}
	removeSubscribtionIntention: Function
	reportSubscribtionIntention: Function
	resubscribe: Function
	skeleton: Function
	subscribe: Function
}

interface Events {
	"moderation.remove._task_id": [
		string,
		{
			callback: Function
			object: ZadaniumContentObject
		}
	]
	"moderation.task._task_id": [
		string,
		{
			callback: Function
			object: ZadaniumContentObject
		}
	]
}

interface Root {
	createdObjects: {
		data: ZadaniumContentObject
		elements: {
			content: init
			header: init
			main: init
			openToplayerButton: init
		}
		events: Events
		getToplayer: Function
		makeObject: Function
		makeRequest: Function
		markBusy: Function
		markRed: Function
		markRemoved: Function
		openToplayer: Function
	}
	data: {
		contentLoading: boolean
		lastId: number
		settings: {
			category_id: number
			schema: "moderation.index"
			subject_id: number
		}
		top: {
			filters: any[]
			pending: string
			subjects: any[]
			title: string
		}
		topLoading: boolean
	}
	elements: {
		contentContainer: init
		contentThrobber: init
		topContainer: init
		topThrobber: init
		viewContainer: init
	}
	generateBoxes: Function
	generateTop: Function
	getContent: Function
	getFilters: Function
	getSettings: Function
	getTop: Function
	hashString: "moderation.all"
	main: {
		all: Root
	}
	makeObject: Function
	onDomReady: string
	rebuildObjectsTable: Function
	refs: {
		[name: string]: Ref
	}
	showLoader: Function
	skeleton: Function
	subscribe: Function
	updateCommentCount: Function
	updateCorrections: Function
	updateTotalCount: Function
}

export interface ZadaniumObject {
	data: ZadaniumContentObject
	elements: {
		content: init
		header: init
		main: init
		openToplayerButton: init
	}
	events: Events
	getToplayer: Function
	makeObject: Function
	makeRequest: Function
	markBusy: Function
	markRed: Function
	markRemoved: Function
	openToplayer: Function
	root: Root
}
