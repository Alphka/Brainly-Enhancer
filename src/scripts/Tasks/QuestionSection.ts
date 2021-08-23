import { DeleteQuestion } from "../../controllers/BrainlyRequest"
import { waitElement } from "../../helpers"
import type QuestionPage from "./QuestionPage"
import type QuickButton from "./QuickButtons/QuickButton"
import QuickButtonsForQuestions from "./QuickButtons/QuickButtonsForQuestions"

export default class QuestionSection {
	main: QuestionPage
	quickButtons: QuickButtonsForQuestions
	isSearching: boolean
	moderationContainer: HTMLDivElement
	isBusy: boolean

	constructor(main: QuestionPage){
		this.main = main
	}
	async Init(){
		if(this.isSearching) return
		this.FindModerationContainer()

		if(!this.main.data.is_deleted){
			await BrainlyEnhancer.FetchReasons()
			if(!this.quickButtons) this.AppendQuickButtons()
		}
	}
	async FindModerationContainer(){
		this.isSearching = true
	
		this.moderationContainer = <HTMLDivElement>(await waitElement(`:scope > [class*=empty] > .sg-box > .sg-flex`, {
			element: this.main.questionContainer
		}))

		this.isSearching = false
		this.moderationContainer.classList.add("sg-flex--wrap")
	}
	AppendQuickButtons(){
		this.quickButtons = new QuickButtonsForQuestions(this)
		this.moderationContainer.firstElementChild.after(this.quickButtons.container)
	}
	async onDelete(e: MouseEvent, quickButton: QuickButton){
		const askConfirmation = this.main.data.approvedAnswersCount > 0
		if(askConfirmation && !confirm("Esta questão possui respostas aprovadas.\nVocê tem certeza que deseja eliminá-la?")) return
		
		const target = <HTMLElement>e.target
		try{
			quickButton.RenderSpinner(target)

			const result = await DeleteQuestion({
				model_id: this.main.data.id,
				reason: quickButton.reasonText,
				reason_id: quickButton.reasonId
			})

			if(!result.success) throw result.message || "Algo deu errado"

			this.quickButtons.container.remove()
			this.main.questionContainer.querySelector(":scope > div > div:last-child").classList.add("solid-peach-light")
			this.main.answersSections.all.forEach(answerSection => answerSection.quickButtons.container.remove())
		}catch(error){
			BrainlyEnhancer.Error(error)
			this.isBusy = false
		}finally{
			quickButton.HideSpinner(target)
		}
	}
}
