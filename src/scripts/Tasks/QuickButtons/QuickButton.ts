import { createElement } from "../../../../src/helpers"
import type QuickButtonsForAnswers from "./QuickButtonsForAnswers"
import type QuickButtonsForQuestions from "./QuickButtonsForQuestions"

type QuickButtonConfig = {
	className: string
	text: string
	title: string
	index: number
	category: number
}

export default class QuickButton {
	element: HTMLButtonElement
	reasonId: number
	reasonText: string

	constructor(main: QuickButtonsForAnswers | QuickButtonsForQuestions, config: QuickButtonConfig){
		this.reasonId = config.category
		this.reasonText = config.text

		this.element = createElement("button", {
			class: "sg-button sg-button--icon-only sg-button--m sg-flex--margin-left-xs",
			title: config.title + "\n".repeat(2) + config.text,
			children: [
				createElement("span", {
					class: "sg-text sg-text--white",
					textContent: String(config.index + 1)
				})
			]
		})

		if(main.buttons.length === 0) this.element.classList.remove("sg-flex--margin-left-xs")
		this.element.classList.add(...config.className.split(" "))

		this.element.addEventListener("click", event => {
			main.main.isBusy = true
			main.main.onDelete.call(main.main, event, this)
		})
	}
	GetButtonText(target: HTMLElement){
		const button = (target instanceof HTMLButtonElement ? target : target.parentElement) as HTMLButtonElement
		const span = button.firstElementChild as HTMLSpanElement
		return { button, span }
	}
	RenderSpinner(target: HTMLElement){
		const { span } = this.GetButtonText(target)
		span.dataset.text = span.textContent
		span.textContent = ""
		span.classList.remove("sg-text")
		span.classList.add("sg-spinner", "sg-spinner--white", "sg-spinner--xsmall")
	}
	HideSpinner(target: HTMLElement){
		const { span } = this.GetButtonText(target)
		span.textContent = span.dataset.text
		span.removeAttribute("data-text")
		span.classList.remove("sg-spinner", "sg-spinner--white", "sg-spinner--xsmall")
		span.classList.add("sg-text")
	}
}
