import type { AnswerDataType, AnswerDetails } from "../../../typings/brainly"
import { DeleteAnswer } from "../../controllers/BrainlyRequest"
import type QuestionPage from "./QuestionPage"
import type QuickButton from "./QuickButtons/QuickButton"
import QuickButtonsForAnswers from "./QuickButtons/QuickButtonsForAnswers"

export default class AnswerSection {
	main: QuestionPage
	data: AnswerDataType
	isSearching: boolean
	quickButtons: QuickButtonsForAnswers
	extraDetails: AnswerDetails
	mainContainer: HTMLDivElement
	moderationContainer: HTMLDivElement
	answerContainer: HTMLDivElement
	moderateButton: HTMLButtonElement
	isBusy: boolean

	constructor(main: QuestionPage, data: AnswerDataType){
		this.main = main
		this.data = data

		this.extraDetails = jsData.question.answers.find(answer => answer.databaseId === data.id)
	}
	async Init(){
		this.FindModerationContainer()
		this.FindModerateButton()

		if(!this.main.data.is_deleted){
			await BrainlyEnhancer.FetchReasons()
			if(!this.quickButtons) this.AppendQuickButtons()
		}
	}
	async FindModerationContainer(){
		this.moderationContainer = this.mainContainer.querySelector(":scope > .sg-box > .sg-flex")
		this.answerContainer = this.mainContainer.querySelector(":scope > .js-answer")

		if(!this.moderationContainer) throw new Error("Could not find moderation container")
		if(!this.answerContainer) throw new Error("Could not find answer container")
		this.moderationContainer.classList.add("sg-flex--wrap")
	}
	async FindModerateButton(){
		this.moderateButton = this.moderationContainer.querySelector(":scope > div:first-child > button")
		if(!this.moderateButton) throw new Error(`Couldn't find the moderate button of the answer ${this.data.id}`)
	}
	AppendQuickButtons(){
		this.quickButtons = new QuickButtonsForAnswers(this)
		this.moderationContainer.firstElementChild.after(this.quickButtons.container)
	}
	async onDelete(e: MouseEvent, quickButton: QuickButton){
		const askConfirmation = this.data.settings.isConfirmed
		if(askConfirmation && !confirm("Esta resposta está aprovada.\nVocê tem certeza que deseja eliminá-la?")) return

		const target = <HTMLElement>e.target
		try{
			quickButton.RenderSpinner(target)

			const result = await DeleteAnswer({
				model_id: this.data.id,
				reason_id: quickButton.reasonId,
				reason: quickButton.reasonText,
				taskId: this.main.data.id
			})

			if(!result.success) throw result.message || "Algo deu errado"
			
			this.quickButtons.container.remove()
			this.mainContainer.lastElementChild.classList.add("solid-peach-light")
		}catch(error){
			BrainlyEnhancer.Error(error)
			this.isBusy = false
		}finally{
			quickButton.HideSpinner(target)
		}
	}
}
