import { createElement } from "../../../helpers"
import type AnswerSection from "../AnswerSection"
import QuickButton from "./QuickButton"

export default class QuickButtonsForAnswers {
	main: AnswerSection
	container: HTMLDivElement
	buttons: QuickButton[]

	constructor(main: AnswerSection){
		this.main = main
		this.buttons = []
		this.Init()
	}
	async Init(){
		this.container = createElement("div", {
			class: "sg-flex sg-flex--wrap sg-flex--justify-content-space-between"
		})

		await BrainlyEnhancer.FetchReasons()
		this.RenderDeleteButtons()
	}
	private async RenderDeleteButtons(){
		const { checkPrivileges, quickButtonsReasons } = BrainlyEnhancer

		if(!checkPrivileges(102)) return

		quickButtonsReasons.answers.forEach((reason, index) => {
			const button = new QuickButton(this, {
				className: "solid-peach",
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
