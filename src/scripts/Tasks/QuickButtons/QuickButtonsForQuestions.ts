import { createElement } from "../../../helpers"
import type QuestionSection from "../QuestionSection"
import QuickButton from "./QuickButton"

export default class QuickButtonsForQuestions {
	main: QuestionSection
	container: HTMLDivElement
	buttons: QuickButton[]

	constructor(main: QuestionSection){
		this.main = main
		this.buttons = []
		this.Init()
	}
	Init(){
		this.container = createElement("div", {
			class: "sg-flex sg-flex--wrap sg-flex--justify-content-space-between"
		})

		this.RenderDeleteButtons()
	}
	private async RenderDeleteButtons(){
		const { checkPrivileges, quickButtonsReasons } = BrainlyEnhancer

		if(!checkPrivileges(102)) return
		quickButtonsReasons.questions.forEach((reason, index) => {
			const button = new QuickButton(this, {
				className: "solid-blue",
				text: reason.reasonText,
				title: reason.reasonTitle,
				category: reason.category,
				index
			})
			
			this.buttons.push(button)
			this.container.appendChild(button.element)
		})
	}
}
