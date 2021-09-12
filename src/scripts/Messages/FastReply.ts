import { createElement, waitElement } from "../../helpers"
import isNumber from "../../helpers/isNumber"

interface CustomSVGUse extends SVGUseElement {
	GetIconId?: () => string
	GetMessage?: () => string
}

type CreatedSVG = HTMLDivElement & {
	svg: SVGElement
	use: CustomSVGUse
}

type CreateSVGOptions = {
	containerClassName?: string
	svgClassName?: string
	svgSize?: number | string
	useClassName?: string
}

export default class FastReply {
	storageKey: string
	footer: HTMLDivElement
	container: HTMLDivElement
	iconsContainer: HTMLDivElement
	arrowIconContainer: CreatedSVG
	arrowIcon: SVGUseElement
	moreMenu: HTMLDivElement
	iconPlus: CreatedSVG
	isMenuOpened: boolean
	isMoreMenuOpened: boolean
	isBusy: boolean
	textarea: {
		opened?: boolean
		container?: HTMLDivElement
		element?: HTMLTextAreaElement
		submitButton?: HTMLDivElement
		closeButton?: CreatedSVG
	}
	isCheckIcon: boolean
	addedCustomIcons: {
		byId: { [id: string]: CreatedSVG },
		all: CreatedSVG[]
	}

	constructor(){
		this.storageKey = "BrainlyEnhancerFastReply"
		this.textarea = {}
		this.addedCustomIcons = {
			byId: {},
			all: []
		}

		this.CreateIcons()
		this.UpdatePage()
		this.BindListeners()
	}
	async UpdatePage(){
		if(this.isMenuOpened) this.HideIconsContainer()
		await this.SetElements()
		this.AppendIcons()
	}
	async SetElements(){
		this.footer = await waitElement(".brn-chatbox__footer") as HTMLDivElement
		this.container = await waitElement(".brn-chatbox__footer .sg-textarea .sg-actions-list", {
			element: this.footer
		}) as HTMLDivElement
	}
	CreateIcons(){
		this.arrowIconContainer = this.CreateSVG("icon-arrow_up", {
			containerClassName: "be-arrow-icon-container"
		})
		this.arrowIcon = this.arrowIconContainer.use
	}
	AppendIcons(){
		this.container.firstElementChild?.before(this.arrowIconContainer)
	}
	ShowIconsContainer(){
		this.isMenuOpened = true
		this.arrowIconContainer.classList.add("open")

		const icons = [
			this.CreateSVG("icon-quote"),
			this.CreateSVG("icon-report_flag"),
			this.CreateSVG("icon-shield"),
			this.CreateSVG("icon-more")
		]

		const [
			quote,
			flag,
			shield,
			more
		] = icons

		quote.svg.addEventListener("mousedown", this.IconListener.bind(this))
		flag.svg.addEventListener("mousedown", this.IconListener.bind(this))
		shield.svg.addEventListener("mousedown", this.IconListener.bind(this))
		more.svg.addEventListener("mousedown", this.ToggleMoreMenu.bind(this))

		this.iconsContainer = createElement("div", {
			class: "be-icons-container",
			children: icons
		})

		this.footer.before(this.iconsContainer)
	}
	IconListener(event: MouseEvent){
		const icon: CustomSVGUse = event.target instanceof SVGUseElement ? event.target : (event.target as HTMLElement).querySelector("use")
		const textarea = this.container.querySelector("textarea.sg-textarea") as HTMLTextAreaElement
		const button = this.container.querySelector("button.sg-button") as HTMLButtonElement

		let message: string
		if(icon.GetMessage){
			const id = icon.GetIconId()

			if(event.shiftKey) return this.OpenTextarea(id, true)
			if(event.ctrlKey) return this.DeleteCustomIcon(id)

			message = icon.GetMessage()
		}else{
			const id = icon.getAttribute("xlink:href").substr(1).split("-")[1]

			if(event.shiftKey) return this.OpenTextarea(id)

			message = this.GetStorage(id) as string
		}

		if(message){
			if(this.isBusy) return

			this.isBusy = true
			textarea.value = message

			const buttonListener = new MutationObserver(async (mutations, observer) => {
				if(!button.classList.contains("disabled")){
					observer.disconnect()
					this.isBusy = false
				}
			})

			buttonListener.observe(button, {
				attributes: true
			})

			return button.click()
		}

		icon.parentElement.classList.add("failure")
		setTimeout(() => icon.parentElement.classList.remove("failure"), 3000)
	}
	OpenTextarea(key: string | number, savedIcon?: boolean){
		if(this.textarea.opened) return
		this.textarea.opened = true

		this.textarea.container = createElement("div", {
			id: "FastReplyOverlay",
			class: "sg-overlay sg-overlay--dark",
			children: [
				createElement("div", {
					class: "sg-toplayer sg-toplayer--modal sg-toplayer--large",
					children: [
						createElement("div", {
							class: "sg-toplayer__close",
							role: "button",
							tabindex: "0",
							children: [
								this.textarea.closeButton = this.CreateSVG("icon-close")
							]
						}),
						createElement("div", {
							class: "sg-toplayer__wrapper",
							children: [
								createElement("div", {
									class: "sg-flex sg-flex--column sg-flex--margin-l sg-flex--margin-bottom-s",
									children: [
										createElement("div", {
											class: "sg-flex sg-flex--justify-content-space-around",
											children: [
												this.textarea.element = createElement("textarea", {
													class: "sg-textarea be-textarea",
													placeholder: "Escreva aqui a sua mensagem",
													maxlength: "512"
												})
											]
										}),
										createElement("div", {
											class: "sg-flex sg-flex--align-items-center sg-flex--justify-content-center",
											children: [
												createElement("div", {
													class: "sg-flex sg-justify-content--center sg-flex--margin-top-s",
													children: [
														this.textarea.submitButton = createElement("div", {
															class: "sg-button",
															children: [
																createElement("span", {
																	class: "sg-text sg-text--white",
																	textContent: "Salvar"
																})
															]
														})
													]
												})
											]
										})
									]
								})
							]
						})
					]
				})
			]
		})

		this.textarea.element.addEventListener("input", this.FixTextarea.bind(this))

		this.textarea.container.addEventListener("click", e => {
			if(!(e.target instanceof HTMLElement)) return
			if(e.target.classList.contains("sg-overlay")) this.HideTextarea()
		})

		if(typeof key === "string" && this.GetStorage(key)) this.textarea.element.value = this.GetStorage(key)
		else if(savedIcon && this.savedIcons[key]) this.textarea.element.value = this.savedIcons[key]

		this.textarea.submitButton.addEventListener("click", e => {
			if(this.isCheckIcon) return
			this.isCheckIcon = true

			const checkIcon = this.CreateSVG("icon-check", {
				containerClassName: "be-check-icon"
			})

			this.textarea.submitButton.after(checkIcon)

			setTimeout(() => {
				checkIcon.remove()
				this.isCheckIcon = false
			}, 3000)

			if(savedIcon){
				if(this.textarea.element.value.trim()){
					const icons = this.savedIcons
					icons[key] = this.textarea.element.value
					this.SetStorage("savedIcons", icons)
					return this.AddCustomIcon(key as string)
				}

				this.DeleteCustomIcon(key as string)
				return this.HideTextarea()
			}

			this.SetStorage(key as string, this.textarea.element.value.trim() || undefined)
		})

		this.textarea.closeButton.addEventListener("click", this.HideTextarea.bind(this))
		document.body.lastElementChild.after(this.textarea.container)
		this.FixTextarea()
	}
	HideTextarea(){
		this.textarea.container.remove()
		this.textarea.opened = false
		this.isCheckIcon = false
		delete this.textarea.container
		delete this.textarea.element
		delete this.textarea.submitButton
		delete this.textarea.closeButton
	}
	FixTextarea(){
		const { element } = this.textarea
		const { style } = element

		if(element.scrollHeight > element.clientHeight){
			style.borderTopRightRadius = "unset"
			style.borderBottomRightRadius = "unset"
		}else element.removeAttribute("style")
	}
	ToggleMoreMenu(forceValue?: boolean){
		this.isMoreMenuOpened = typeof forceValue === "boolean" ? forceValue : !this.isMoreMenuOpened

		if(!this.moreMenu){
			this.moreMenu = createElement("div", {
				class: "be-more-menu",
				children: [
					this.iconPlus = this.CreateSVG("icon-plus")
				]
			})

			Object.getOwnPropertyNames(this.savedIcons).forEach(id => this.AddCustomIcon(id))

			this.iconPlus.addEventListener("click", e => {
				if(this.iconPlus.classList.contains("maxlength")) return

				const ids = Object.getOwnPropertyNames(this.savedIcons)
					.filter(name => isNumber(name))
					.map(id => Number(id))

				const maxId = Number.isFinite(Math.max(...ids)) ? Math.max(...ids) : 0

				this.OpenTextarea(maxId + 1, true)
			})

			if(this.savedIcons.length === 3) this.iconPlus.classList.add("maxlength")
		}

		this.isMoreMenuOpened ? this.moreMenu.classList.add("open") : this.moreMenu.classList.remove("open")
		this.iconsContainer.appendChild(this.moreMenu)
	}
	HideIconsContainer(){
		this.isMenuOpened = false
		this.isMoreMenuOpened = false
		this.arrowIconContainer.classList.remove("open")
		this.iconsContainer.remove()
	}
	AddCustomIcon(id: string, force?: boolean){
		if(this.addedCustomIcons.byId[id]){
			if(force) this.moreMenu.appendChild(this.addedCustomIcons.byId[id])
			return
		}

		const icon = this.CreateSVG("icon-settings")
		this.addedCustomIcons.byId[id] = icon
		this.addedCustomIcons.all.push(icon)

		icon.use.GetMessage = () => this.savedIcons[id]
		icon.use.GetIconId = () => id

		icon.svg.addEventListener("click", this.IconListener.bind(this))

		let isTooFast = false
		icon.svg.addEventListener("mouseenter", e => {
			if(isTooFast) return

			isTooFast = true
			setTimeout(() => isTooFast = false, 1000)

			document.querySelector("#TitleText")?.remove()

			const text = createElement("span", {
				id: "TitleText",
				style: `top: ${e.y - 60}px; left: ${e.x}px;`,
				textContent: icon.use.GetMessage()
			})

			icon.svg.addEventListener("mouseleave", () => text.remove(), {once: true})
			setTimeout(() => text.remove(), 5000)
			document.body.appendChild(text)
		})

		this.iconPlus.classList[this.savedIcons.length === 3 ? "add" : "remove"]("maxlength")
		this.moreMenu.appendChild(icon)
	}
	DeleteCustomIcon(id: string){
		const icons = this.savedIcons
		if(typeof icons[id] === "undefined") return

		delete icons[id]
		this.SetStorage("savedIcons", icons)

		document.querySelector("#TitleText")?.remove()
		this.addedCustomIcons.byId[id].remove()
		this.addedCustomIcons.all.splice(this.addedCustomIcons.all.indexOf(this.addedCustomIcons.byId[id]), 1)
		delete this.addedCustomIcons.byId[id]

		this.iconPlus.classList[this.savedIcons.length === 3 ? "add" : "remove"]("maxlength")
	}
	CreateSVG(href: string, options: CreateSVGOptions = {}): CreatedSVG {
		const container = createElement("div", {
			class: `sg-icon sg-icon--gray-secondary sg-icon--x${options.svgSize || 24}`
		}),
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		use = document.createElementNS("http://www.w3.org/2000/svg", "use")

		if(options.containerClassName) container.classList.add(...options.containerClassName.split(" "))
		if(options.svgClassName) svg.classList.add(...options.svgClassName.split(" "))
		if(options.useClassName) use.classList.add(...options.useClassName.split(" "))

		use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + href)
		svg.classList.add("sg-icon__svg")
		svg.appendChild(use)
		container.appendChild(svg)

		return Object.assign(container, { svg, use })
	}
	async BindListeners(){
		const chatbox = await waitElement("#private-messages-container")
		const chatboxObserver = new MutationObserver((mutations, observer) => {
			const hasChanged = mutations.some(mutation => {
				if(!(mutation.target instanceof HTMLElement)) return
				return mutation.target.id === "private-messages-container"
			})

			if(hasChanged) this.UpdatePage()
		})

		chatboxObserver.observe(chatbox, {
			childList: true
		})

		this.arrowIconContainer.addEventListener("click", e => {
			if(this.isMenuOpened) this.HideIconsContainer()
			else this.ShowIconsContainer()
		})
	}
	GetStorage(key?: string){
		const storage = localStorage.getItem(this.storageKey)
		let object: object

		const CreateStorage = () => {
			localStorage.setItem(this.storageKey, "{}")
			object = {}
		}

		if(storage){
			try{
				object = JSON.parse(storage)
				if(!(object instanceof Object)) throw "Invalid value"
			}catch(error){
				BrainlyEnhancer.Error(error)
				CreateStorage()
			}
		}else CreateStorage()

		return key ? object[key] : object
	}
	SetStorage(key: string, value: any){
		if(!key) throw new Error("No key provided")

		const storage = this.GetStorage()
		storage[key] = value
		localStorage.setItem(this.storageKey, JSON.stringify(storage))
	}
	get savedIcons(): {
		[id: number]: string
		length: number
	}{
		const storage = this.GetStorage("savedIcons")
		if(storage instanceof Object && length <= 3) return Object.setPrototypeOf(storage, {
			length: Object.getOwnPropertyNames(storage).length
		})

		const object = {}
		return Object.setPrototypeOf(object, {length: 0})
	}
}
