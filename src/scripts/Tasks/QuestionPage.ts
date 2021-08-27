import { waitElement, waitObject } from "../../helpers"
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
	
		await waitObject("window.jsData")

		this.answersSections.containers.find(container => {
			const headerAttributes = container.querySelector(".brn-qpage-next-answer-box__header .brn-qpage-next-answer-box-header__attributes")
			const rating = Math.floor(Number(headerAttributes.querySelector(":scope > div:first-child > .sg-text")?.textContent.split("/")[0]))
			const thanks = Number(headerAttributes.querySelector(":scope > div:last-child > .sg-text")?.textContent.split("/")[0])
			const nick = container.querySelector(".brn-qpage-next-answer-box-author > .brn-qpage-next-answer-box-author__description > div:first-child > span")?.textContent
			
			const match = jsData.question.answers.find(answer => {
				if(nick && answer.user.nick === nick) return true
				return rating === Math.floor(answer.rating) && thanks === answer.thanks
			})

			if(match){
				const answersSections = new AnswerSection(this, match)
	
				answersSections.mainContainer = container
				answersSections.Init()
	
				this.answersSections.byId[match.databaseId] = answersSections
				this.answersSections.all.push(answersSections)
			}else BrainlyEnhancer.log({
				rating,
				thanks,
				nick,
				answers: jsData.question.answers
			})
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
