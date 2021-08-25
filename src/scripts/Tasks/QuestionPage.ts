import { waitElement } from "../../helpers"
import type { QuestionDataType } from "../../../typings/brainly"
import AnswerSection from "./AnswerSection"
import QuestionSection from "./QuestionSection"

export default class QuestionPage {
	data: QuestionDataType
	questionSection: QuestionSection
	questionContainer: HTMLElement
	answersSections: {
		containers: HTMLDivElement[]
		all: AnswerSection[]
		byId: { [id: number]: AnswerSection }
	}
	
	constructor(){
		this.answersSections = {
			containers: [],
			all: [],
			byId: {}
		}

		this.Init()
	}
	async Init(){
		await this.FindQuestionContainer()
		this.SetQuestionData()
		this.InitSections()
		this.ObserveForElements()
	}
	async FindQuestionContainer(){
		this.questionContainer = await waitElement(".js-main-question")
	}
	SetQuestionData(){
		try{
			this.data = JSON.parse(this.questionContainer.dataset.z)
			if(!this.data) throw new Error("Could not set question's data")
		}catch(error){
			console.error(error)
		}
	}	
	InitSections(){
		if(BrainlyEnhancer.checkPrivileges(1)){
			this.questionSection = new QuestionSection(this)
			this.questionSection.Init()
		}

		this.RenderAnswersSections()
	}
	async RenderAnswersSections(){
		if(!this.data.responses.length) return

		this.answersSections.containers = Array.from(await waitElement(".js-question-answers > div > div[class*=empty]", {
			multiple: true
		})) as HTMLDivElement[]
	
		this.data.responses.forEach((data, index) => {
			const answersSections = new AnswerSection(this, data)
	
			answersSections.mainContainer = this.answersSections.containers[index]
			answersSections.Init()

			this.answersSections.byId[data.id] = answersSections
			this.answersSections.all.push(answersSections)
		})
	}
	async ObserveForElements(){
		if(this.data.is_deleted){
			await waitElement(".brn-qpage-next-question-box__content--deleted")
			const questionContent = this.questionContainer.querySelector(":scope > div > div:last-child")
			questionContent.classList.add("solid-peach-light")
			questionContent.lastElementChild.classList.remove("brn-qpage-next-question-box__content--deleted")
		}

		const mainContent = document.querySelector(".js-main-container")

		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if(!mutation.addedNodes.length || !(mutation.target instanceof HTMLElement)) return
				if(mutation.target.classList.contains("js-main-question")) return this.questionSection?.Init()
				if(mutation.target.classList.contains("js-react-answers")) return this.answersSections.all.forEach(answerSection => answerSection.Init())
			})
		})
		
		observer.observe(mainContent, {
			childList: true,
			subtree: true
		})

		waitElement(".js-react-answers").then(() => this.answersSections.all.forEach(answerSection => answerSection.Init()))
	}
}
