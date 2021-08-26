// @ts-nocheck

import type { GetUserByIdData } from "../../../../typings/brainly"
import { DeleteAnswer, DeleteQuestion, GetAllAnswers, GetAllQuestions, GetUsersById } from "../../../controllers/BrainlyRequest"
import { createElement } from "../../../helpers"
import isNumber from "../../../helpers/isNumber"
import ModeratePanel from "../ModeratePanel"

export default class MassDelete {
	className: string
	link: HTMLLIElement
	menu: HTMLDivElement & {
		toplayer: HTMLDivElement
		close: HTMLDivElement & {
			icon: HTMLDivElement
		}
		wrapper: HTMLDivElement & {
			column: HTMLDivElement
		}
	}
	header: HTMLHeadingElement & {
		container: HTMLDivElement
	}
	content: HTMLDivElement
	deleteButton: HTMLDivElement & {
		wrapper: HTMLDivElement
		container: HTMLDivElement
		spinner: HTMLDivElement
		text: HTMLSpanElement
	}
	textarea: HTMLDivElement & {
		container: HTMLDivElement
	}
	usersPanel: HTMLDivElement
	users: Map<number, GetUserByIdData & {
		container: HTMLDivElement
	}>
	isFetching: boolean
	TimeoutDate: number
	Delay: number
	isBusy: boolean
	canRequest: boolean
	waitForRequest: boolean
	contentToDelete: number[]
	options: {
		container: HTMLDivElement
		questions: HTMLInputElement
		questionsLabel: HTMLLabelElement
		answers: HTMLInputElement
		answersLabel: HTMLLabelElement
	}

	constructor(){
		this.className = "sg-flex sg-flex--align-items-center sg-flex--justify-content-center"
		this.isFetching = false
		this.Delay = 1500
		this.users = new Map()
		this.contentToDelete = []

		this.RenderMenu()
		this.Init()
	}
	async Init(){
		if(!document.body) await new Promise(resolve => window.addEventListener("DOMContentLoaded", resolve))

		this.RenderCloseSVG()
		this.RenderTextArea()
		this.RenderDeleteButton()
		this.RenderElements()
		this.HideSpinner()
		await this.AppendLinkToBrainlyMenu()
		this.BindHandlers()
	}
	RenderMenu(){
		this.menu = createElement("div", {
			class: "sg-overlay sg-overlay--dark",
			role: "dialog"
		})

		this.menu.toplayer = createElement("div", {
			class: "sg-toplayer sg-toplayer--modal sg-toplayer--large",
			children: [
				this.menu.close = createElement("div", {
					class: "sg-toplayer__close",
					role: "button",
					tabindex: "0"
				}),
				this.menu.wrapper = createElement("div", {
					class: "sg-toplayer__wrapper"
				})
			]
		})

		this.menu.wrapper.column = createElement("div", {
			class: "sg-flex sg-flex--column sg-flex--margin-l sg-flex--margin-bottom-s"
		})
		
		createElement("div", {
			class: "sg-flex sg-flex--margin-bottom-m sg-flex--justify-content-center",
			children: [
				this.header = createElement("h1", {
					class: "sg-headline sg-headline--xlarge sg-headline--extra-bold",
					textContent: "Eliminar em massa"
				})
			]
		})

		const name = "MassDeleteOption"
		this.options = {
			container: createElement("div", {
				id: "MassDeleteOptions",
				class: "sg-flex sg-flex--justify-content-space-around sg-flex--margin-top-s",
			}),
			questions: createElement("input", {
				type: "radio",
				id: name + "Questions",
				name
			}),
			questionsLabel: createElement("label", {
				textContent: "Perguntas",
				for: name + "Questions"
			}),
			answers: createElement("input", {
				type: "radio",
				checked: "checked",
				id: name + "Answers",
				name
			}),
			answersLabel: createElement("label", {
				textContent: "Respostas",
				for: name + "Answers"
			})
		}
	}
	RenderCloseSVG(){
		this.menu.close.icon = createElement("div", {
			class: "sg-icon sg-icon--gray-secondary sg-icon--x24"
		})

		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		const icon = document.createElementNS("http://www.w3.org/2000/svg", "use")
		
		icon.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#icon-close")
		svg.appendChild(icon)
		svg.classList.add("sg-icon__svg")
		this.menu.close.icon.appendChild(svg)
		this.menu.close.appendChild(this.menu.close.icon)
		this.menu.close.addEventListener("click", this.HideMenu.bind(this))
	}
	RenderTextArea(){
		this.content = createElement("div", {
			class: "sg-flex sg-flex--justify-content-space-around"
		})

		this.textarea = createElement("div", {
			class: "sg-textarea",
			contenteditable: "true",
			id: "MassDeleteTextarea",
			placeholder: "Aqui você pode inserir o perfil do usuário, ou o seu ID"
				+ "\n\nPor exemplo:"
				+ `\n\n${location.origin}/perfil/user-12345678`
				+ `\n${location.origin}/app/profile/12345678`
				+ "\n12345678"
		})

		this.usersPanel = createElement("div", {
			class: "sg-flex sg-flex--column",
			id: "MassDeleteUsersPanel"
		})

		this.textarea.container = createElement("div", {
			class: this.className
		})
	}
	RenderDeleteButton(){
		this.deleteButton = createElement("div", {
			class: "sg-button solid-peach"
		})

		this.deleteButton.wrapper = createElement("div", {
			class: "sg-flex sg-flex--align-items-center sg-flex--justify-content-space-evenly"
		})

		this.deleteButton.container = createElement("div", {
			class: "sg-flex sg-justify-content--center sg-flex--margin-top-s"
		})

		this.deleteButton.spinner = this.deleteButton.appendChild(createElement("div", {
			class: "sg-spinner sg-spinner--white"
		}))

		this.deleteButton.text = this.deleteButton.appendChild(createElement("span", {
			class: "sg-text sg-text--white",
			textContent: "Eliminar"
		}))
	}
	RenderElements(){
		this.header.container = this.header.parentElement as HTMLDivElement
		this.header.container.appendChild(this.header)
		this.menu.wrapper.column.appendChild(this.header.container)

		this.textarea.container.appendChild(this.textarea)
		this.content.appendChild(this.textarea.container)
		this.content.appendChild(this.usersPanel)
		this.deleteButton.container.appendChild(this.deleteButton)
		this.deleteButton.wrapper.appendChild(this.deleteButton.container)

		this.options.container.appendChild(this.options.questions)
		this.options.container.appendChild(this.options.questionsLabel)
		this.options.container.appendChild(this.options.answers)
		this.options.container.appendChild(this.options.answersLabel)
		this.deleteButton.wrapper.appendChild(this.options.container)

		this.menu.wrapper.column.appendChild(this.content)
		this.menu.wrapper.column.appendChild(this.deleteButton.wrapper)

		this.menu.wrapper.appendChild(this.menu.wrapper.column)
		this.menu.toplayer.appendChild(this.menu.wrapper)
		this.menu.appendChild(this.menu.toplayer)
	}
	BindHandlers(){
		this.textarea.addEventListener("input", this.TextAreaListener.bind(this))
		this.link.addEventListener("click", this.ShowMenu.bind(this))
		this.deleteButton.addEventListener("click", e => this.StartDeleting(this.option))
		this.menu.addEventListener("click", e => e.target.classList.contains("sg-overlay") && this.HideMenu())
		window.addEventListener("keyup", e => e.key === "Escape" && this.HideMenu())
	}
	async AppendLinkToBrainlyMenu(){
		await ModeratePanel.WaitMenu()
		
		this.link = createElement("li", {
			style: "user-select: none",
			children: [
				createElement("a", {
					style: "cursor: pointer",
					textContent: "Eliminar em massa"
				})
			]
		})
		
		if(!ModeratePanel.IsOldLayout()){
			this.link.classList.add("sg-menu-list__element")
			this.link.firstElementChild.classList.add("sg-menu-list__link")
		}

		await ModeratePanel.AddItem(this.link)
	}
	TextAreaListener(){
		this.FixTextareaScrollbar()
		this.TimeoutDate = Date.now() + this.Delay
		window.setTimeout(() => Date.now() >= this.TimeoutDate && this.RenderUsers(), this.Delay + 10)
	}
	FixTextareaScrollbar(){
		const style = this.textarea.style

		if(this.textarea.scrollHeight > 300 + 16){
			style.borderTopRightRadius = "unset"
			style.borderBottomRightRadius = "unset"
		}else{
			style.borderTopRightRadius = "20px"
			style.borderBottomRightRadius = "20px"
		}
	}
	async RenderUsers(){
		if(this.isFetching) return
		this.isFetching = true		 

		let matches = [...this.textarea.innerHTML.matchAll(/(?<=<div>)\w*(?<!<\/div>)/gi)]
			.map(match => match[0])
			.filter(line => line?.trim().length)
		
		if(!matches.length) matches = [this.textarea.textContent]

		const ids = matches
			.map(line => {
				if(isNumber(line)) return line
				return line.match(/(?<=[\/\-])(?<id>\d+)(?<!\/)/)?.groups?.id
			})
			.filter(line => line)
		
		if(!ids.length){
			this.isFetching = false	
			this.RemoveUser(null)
			return
		}

		const data = await GetUsersById(...ids)
		const usersIdsRequest = data.map(user => user.id)
		const listedUsers = Array.from(this.users.values()).map(user => user.id)

		listedUsers.forEach(listedUser => !usersIdsRequest.includes(listedUser) && this.RemoveUser(listedUser))

		data.filter(user => !listedUsers.includes(user.id))
			.forEach(user => this.AppendUser(user))

		this.isFetching = false
	}
	AppendUser(user: GetUserByIdData){
		let userImage: HTMLImageElement

		const container = createElement("div", {
			class: this.className,
			children: [
				createElement("div", {
					class: "sg-flex sg-flex--justify-content-space-around sg-bubble--mint-secondary-light sg-box--padding-xs sg-box sg-flex--margin-bottom-xxs",
					children: [
						createElement("div", {
							class: "sg-flex sg-flex--align-items-center sg-flex--justify-content-center",
							children: [
								createElement("div", {
									class: "sg-avatar",
									children: [
										userImage = createElement("img", {
											class: "sg-avatar__image",
											src: user.avatar?.medium
										})
									]
								})
							]
						}),
						createElement("div", {
							class: "sg-flex sg-flex--column",
							style: "width: calc(100% - 50px)",
							children: [
								createElement("div", {
									class: "sg-text sg-label__text",
									textContent: String(user.id)
								}),
								createElement("div", {
									class: "sg-text sg-label__text",
									textContent: user.nick
								})
							]
						})
					]
				})
			]
		})

		userImage.addEventListener("error", () => userImage.src = "/img/avatars/100-ON.png")
		this.users.set(user.id, Object.assign(user, { container }))
		this.usersPanel.appendChild(container)
	}
	RemoveUser(userId?: number){
		if(userId === null){
			Array.from(this.users.values()).forEach(user => user.container?.remove())
			this.users.clear()
			return
		}

		if(this.users.has(userId)){
			this.users.get(userId).container?.remove()
			this.users.delete(userId)
		}
	}
	ShowMenu(){
		document.body.lastElementChild.after(this.menu)
	}
	HideMenu(){
		this.menu.remove()
	}
	ShowSpinner(){
		this.isBusy = true
		this.deleteButton.text.remove()
		this.deleteButton.appendChild(this.deleteButton.spinner)
	}
	HideSpinner(){
		this.isBusy = false
		this.deleteButton.appendChild(this.deleteButton.text)
		this.deleteButton.spinner.remove()
	}
	get option(){
		const questions = this.options.questions.checked
		const answers = this.options.answers.checked

		if(questions && answers) throw new Error("Both questions and answers are checked")

		return questions ? "questions" : answers ? "answers" : (function(){
			throw new Error("There is no option checked")
		})()
	}
	async StartDeleting(option: "answers" | "questions"){
		if(this.isBusy) return

		const allUsers = [...this.users.values()]
		this.ShowSpinner()
		if(!allUsers.length) return this.HideSpinner()

		this.canRequest = true
		this.RequestListener(option)

		for(const user of allUsers){
			this.waitForRequest = true

			switch(option){
				case "answers":
					await GetAllAnswers(user.id, id => {
						console.log("Resposta adicionada:", id)
						this.contentToDelete.push(id)
					}).finally(() => this.waitForRequest = false)
				break
				case "questions":
					// If it has no IDs, shut down loop
					setTimeout(() => this.waitForRequest = false, 1000)

					await GetAllQuestions(user.id, id => {
						this.contentToDelete.push(id)
						this.waitForRequest = false
					})
				break
				default: throw new Error("Invalid option: " + option)
			}

		}
	}
	RequestListener(option: "answers" | "questions"){
		if(!this.canRequest) return
		this.canRequest = false

		const interval = window.setInterval(() => {
			const contentToDelete = this.contentToDelete.splice(0, 4)

			for(const id of contentToDelete){
				const data = {
					model_id: id,
					reason: "Seu conteúdo foi excluído por não estar de acordo com as regras de utilização do Brainly. Por favor, poste apenas conteúdo escolar, e formule perguntas e respostas completas. Para saber mais sobre as regras de uso do Brainly acesse http://brainly.ninja/br/regras"
				}

				switch(option){
					case "answers":
						DeleteAnswer({
							...data,
							reason_id: 50
						})
					break
					case "questions":
						DeleteQuestion({
							...data,
							reason_id: 52
						})
					break
				}
			}

			if(!this.waitForRequest && !this.contentToDelete.length){
				this.canRequest = true
				this.HideSpinner()
				clearInterval(interval)
			}
		}, 1000)
	}
}
