import type { AnswerDetails, BrainlyActionData } from "../../../typings/brainly"
import { DeleteAnswer } from "../../controllers/BrainlyRequest"
import type QuestionPage from "./QuestionPage"
import type QuickButton from "./QuickButtons/QuickButton"
import QuickButtonsForAnswers from "./QuickButtons/QuickButtonsForAnswers"

export default class AnswerSection {
	main: QuestionPage
	data: AnswerDetails
	isSearching: boolean
	quickButtons: QuickButtonsForAnswers
	extraDetails: AnswerDetails
	mainContainer: HTMLDivElement
	moderationContainer: HTMLDivElement
	answerContainer: HTMLDivElement
	moderateButton: HTMLButtonElement
	isBusy: boolean

	constructor(main: QuestionPage, data: AnswerDetails){
		this.main = main
		this.data = data
	}
	async Init(){
		this.extraDetails = jsData.question.answers.find(answer => answer.databaseId === this.data.databaseId)
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
		if(!this.moderateButton) throw new Error(`Couldn't find the moderate button of the answer ${this.data.databaseId}`)
	}
	AppendQuickButtons(){
		this.quickButtons = new QuickButtonsForAnswers(this)
		this.moderationContainer.firstElementChild.after(this.quickButtons.container)
	}
	async onDelete(event: MouseEvent, quickButton: QuickButton, isQuestion = false){
		const Delete = async (options: BrainlyActionData) => {
			const result = await DeleteAnswer(options)

			if(!result.success) throw result.message || "Algo deu errado"
			
			this.quickButtons.container.remove()
			this.mainContainer.lastElementChild.classList.add("solid-peach-light")
		},
		config = {
			model_id: this.data.databaseId,
			taskId: this.main.data.id
		} as BrainlyActionData
		
		if(isQuestion){
			this.quickButtons.buttons.forEach(button => button.RenderSpinner(button.element))

			return await Delete({
				...config,
				reason: quickButton.reasonText
			}).finally(() => {
				// Hide spinners if some error happened
				this.quickButtons.buttons.forEach(button => button.HideSpinner(button.element))

				this.isBusy = false
			})
		}
		
		const target = event.target as HTMLElement
		const Cancel = () => {
			this.isBusy = false
			quickButton.HideSpinner(target)
		}

		quickButton.RenderSpinner(target)

		if(event.ctrlKey){
			const applyWarning = confirm("Você deseja aplicar uma advertência neste conteúdo?")
			if(applyWarning) config.give_warning = true
		}else{
			const askConfirmation = this.data.confirmed
			if(askConfirmation && !confirm("Esta resposta está aprovada.\nVocê tem certeza que deseja eliminá-la?")) return Cancel()
		}

		await Delete({
			...config,
			reason_id: quickButton.reasonId,
			reason: quickButton.reasonText
		})
		.catch(error => {
			BrainlyEnhancer.Error(error)
			quickButton.HideSpinner(target)
		})
		.finally(() => this.isBusy = false)
	}
}
