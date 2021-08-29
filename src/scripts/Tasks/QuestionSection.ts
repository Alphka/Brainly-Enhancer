import type { BrainlyActionData } from "../../../typings/brainly"
import { DeleteAnswer, DeleteQuestion } from "../../controllers/BrainlyRequest"
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
		
		await this.FindModerationContainer()

		if(!this.main.data.is_deleted){
			await BrainlyEnhancer.FetchReasons()
			await waitElement("button.sg-button", {
				element: this.moderationContainer
			})

			if(!this.quickButtons) this.AppendQuickButtons()
		}
	}
	async FindModerationContainer(){
		this.isSearching = true
	
		this.moderationContainer = <HTMLDivElement>(await waitElement(`:scope > [class*=empty] > .sg-box > .sg-flex`, {
			element: this.main.questionContainer
		}))

		this.moderationContainer.classList.add("sg-flex--wrap")
		this.isSearching = false
	}
	AppendQuickButtons(){
		this.quickButtons = new QuickButtonsForQuestions(this)
		this.moderationContainer.firstElementChild.after(this.quickButtons.container)
	}
	async onDelete(event: MouseEvent, quickButton: QuickButton){
		const target = event.target as HTMLElement
		const Cancel = () => {
			this.isBusy = false
			quickButton.HideSpinner(target)
		}

		const config = {
			model_id: this.main.data.id,
			reason: quickButton.reasonText,
			reason_id: quickButton.reasonId
		} as BrainlyActionData
		
		try{
			quickButton.RenderSpinner(target)

			if(event.ctrlKey){
				const applyWarning = confirm("Você deseja aplicar uma advertência neste conteúdo?")
				if(applyWarning) config.give_warning = true
			}else if(event.shiftKey){
				const deleteAnswers = confirm("Você deseja eliminar todas as respostas desta pergunta?")

				// if(this.main.answersSections.all.length > 2)
				console.log(this.main.answersSections)

				if(deleteAnswers) for(const answer of this.main.answersSections.all){
					await this.main.answersSections.byId[answer.extraDetails.databaseId]
						.onDelete(event, quickButton, true)
						.catch(BrainlyEnhancer.Error)
					
					await new Promise(resolve => setTimeout(resolve, 100))
				}
			}else{
				const askConfirmation = this.main.data.approvedAnswersCount > 0
				if(askConfirmation && !confirm("Esta questão possui respostas aprovadas.\nVocê tem certeza que deseja eliminá-la?")) return Cancel()
			}

			const result = await DeleteQuestion(config)

			if(!result.success) throw result.message || "Algo deu errado"
			
			this.quickButtons.container.remove()
			this.main.questionContainer.querySelector(":scope > div > div:last-child").classList.add("solid-peach-light")
			this.main.answersSections.all.forEach(answerSection => answerSection.quickButtons.container.remove())
		}catch(error){
			BrainlyEnhancer.Error(error)
			quickButton.HideSpinner(target)
		}finally{
			this.isBusy = false
		}
	}
}
