const {
	checkPrivileges,
	createElement,
	waitElement,
	waitObject,
	log,
	request
} = BrainlyEnhancer

/** @type {import("typings/global").QuickButtonPreferences} */
const QuickButtonPreferences = {
	requested: false,
	maxButtons: 3,
	getLocalStorage(){
		return localStorage.getItem("BrainlyEnhancerQuickButtons")
	},
	hasPreferences(){
		const preferences = this.getLocalStorage()
		try{
			if(preferences){
				const array = JSON.parse(preferences)
				return array instanceof Array && array.length <= this.maxButtons && array.every(preference => (
					typeof preference.category === "number" &&
					typeof preference.subCategory === "number"
				))
			}else return false
		}catch(error){
			return false
		}
	},
	async getPreferences(type){
		if(!this.hasPreferences()) return (await this.defaultPreferences)[type]

		if(!["question", "answer"].includes(type)) throw new ReferenceError("Invalid preference type")
		const preferences = this.getLocalStorage()
		return JSON.parse(preferences)[type]
	},
	get defaultPreferences(){
		if(this.requested === true) return this.response
		this.requested = true
		return this.response = request(`chrome-extension://${BrainlyEnhancer.extensionId}/src/database/DefaultReasons.json`)
	}
}

class QuickButton {
	constructor(type, id, container){
		this.maxButtons = QuickButtonPreferences.maxButtons
		this.type = type
		this.container = container
		this.id = Number(id)
		this.index = this.id - 1
	}
	async getReasonDetails(id){
		if(BrainlyEnhancer.moderationData === null) throw new Error("Request failed")
		else await waitObject("BrainlyEnhancer.moderationData")

		return BrainlyEnhancer.moderationData.delete_reasons[this.type].find(reason => reason.id === id)
	}
	createButton(preference, reason){
		const questionData = JSON.parse(document.querySelector(".js-main-question[data-z]").dataset.z),
		usersData = Object.values(JSON.parse(document.querySelector(".js-users-data[data-z").dataset.z)),
		subCategoryText = reason.subcategories.find(subcategory => subcategory.id === preference.subCategory).text,
		buttonText = createElement("span", { textContent: this.id }),
		button = createElement("button", {
			class: "sg-button sg-button--icon-only " + (this.type === "task" ? "sg-button--solid-blue" : "sg-label--peach-primary"),
			title: reason.text + "\n".repeat(2) + subCategoryText,
			children: [ buttonText ]
		})

		if(this.id !== this.maxButtons) button.classList.add("sg-flex--margin-right-xs")
		button.addEventListener("click", async e => {
			buttonText.textContent = ""
			buttonText.classList.add("sg-spinner", "sg-spinner--white")
			
			let container
			if(this.type === "task"){
				container = this.container

				await request(location.origin + "/api/28/moderation_new/delete_task_content", "POST", {
					model_id: questionData.id,
					model_type_id: 1,
					reason_id: preference.category,
					reason: subCategoryText,
					give_warning: false,
					take_points: true,
					return_points: false
				})
			}else{
				container = this.container.querySelector(":scope > div:nth-of-type(2)")
				
				const nickname = container.querySelector(".brn-qpage-next-answer-box-author__description > div > span.sg-text").textContent,
				authorId = usersData.find(user => user.nick === nickname).id,
				answerDetails = questionData.responses.find(answer => answer.userId === authorId)

				await request(location.origin + "/api/28/moderation_new/delete_response_content", "POST", {
					model_id: answerDetails.id,
					model_type_id: 2,
					reason_id: preference.category,
					reason: subCategoryText,
					give_warning: false,
					take_points: true
				})	
			}
			
			container.classList.add("sg-label--peach-primary")
			button.parentElement.remove()

			request(location.origin + "/api/28/moderate_tickets/expire", "POST", {
				model_id: questionData.id,
				model_type_id: 1
			})
		})

		return button
	}
	get button(){
		return new Promise(async (resolve, reject) => {
			const preferences = await QuickButtonPreferences.getPreferences(this.type),
			reason = await this.getReasonDetails(preferences[this.index].category)
			resolve(this.createButton(preferences[this.index], reason))
		})
	}
}

const bodyMutation = new MutationObserver((mutations, observer) => {
	for(const mutation of mutations){
		// @ts-ignore
		if(mutation.target.id === "moderate-task-toplayer" && mutation.type === "childList" && mutation.addedNodes.length){
			const deleteButtons = document.querySelectorAll("button.btn.btn-mini.btn-danger.delete")

			deleteButtons.forEach(button => button.addEventListener("click", e => {
				const elements = {
					/** @type {HTMLDivElement} */
					container: button.parentElement.parentElement.classList.contains("header")
						?  button.parentElement.parentElement.parentElement.querySelector(":scope > .contents > .action-delete")
						: button.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(":scope > .action-delete"),
					/** @type {NodeListOf<HTMLDivElement>} */
					get categories(){
						return this.container.querySelectorAll(":scope > div > div:nth-of-type(1) > .category-container")
					},
					/** @type {NodeListOf<HTMLDivElement>} */
					get subcategories(){
						return this.container.querySelectorAll(":scope > div > .subs > .subcategories")
					},
					/** @type {HTMLInputElement} */
					get mainCategoryButton(){
						return this.categories[0].querySelector(":scope > input")
					},
					/** @type {HTMLTextAreaElement} */
					get mainTextarea(){
						return this.container.querySelector(":scope > div > p:nth-of-type(1) textarea")
					}
				}

				console.log(elements.mainCategoryButton)
				elements.mainCategoryButton.click()
				elements.mainTextarea.value = elements.subcategories[0].querySelector(":scope > input").getAttribute("z-text")
			}, { once: true }))
		}
	}
});

(async function(){
	if(!window.dataLayer) await waitElement("window.dataLayer")
	if(!window.dataLayer[0].user.isLoggedIn) return
	if(!document.body) await new Promise(resolve => window.addEventListener("DOMContentLoaded", resolve))

	bodyMutation.observe(document.body, {
		attributes: true,
		childList: true,
		subtree: true
	})

	const article = await waitElement("article"),
	questionData = JSON.parse(article.dataset.z)

	if(checkPrivileges(102)){
		if(questionData.is_deleted){
			await waitElement(".brn-qpage-next-question-box__content--deleted").then(element => element.classList.remove("brn-qpage-next-question-box__content--deleted"))
			await waitElement(".brn-qpage-next-question-box").then(element => element.classList.add("sg-label--peach-primary"))
			return
		}

		request(location.origin + "/api/28/moderation_new/get_content", "POST", {
			model_id: questionData.id,
			model_type_id: 1,
		}).then(response => {
			if(!response.success) throw response.message ? new Error(response.message) : response
			BrainlyEnhancer.moderationData = response.data
		}).catch(error => {
			BrainlyEnhancer.moderationData = null
			log(error)
		})

		// Needs to wait to work correctly
		await waitElement(".sg-box.sg-box--light ~ .brn-qpage-next-question-box").then(async questionContainer => {
			const preferences = await QuickButtonPreferences.getPreferences("task"),
			container = createElement("div", { class: "sg-flex" })

			for(let i = 1; i <= preferences.length; i++) container.appendChild(await new QuickButton("task", i, questionContainer).button)
			questionContainer.previousElementSibling.querySelector(":scope > div > button").after(container)
		}).catch(log)

		waitElement(".js-react-answers > div > div:not(.sg-space-ignore):not(.brn-qpage-next-answer-box)", true).then(async answersContainers => {
			for(const answerContainer of Array.from(answersContainers)){
				const header = answerContainer.querySelector(":scope > div:nth-of-type(1)"),
				preferences = await QuickButtonPreferences.getPreferences("response"),
				container = createElement("div", { class: "sg-flex" })

				/** @type {NodeListOf<HTMLDivElement>} */
				// @ts-ignore
				const flexElements = await waitElement(":scope > div > div", true, header)
				flexElements[0].style.flex = flexElements[1].style.flex = "1"
				flexElements[0].style.minWidth = flexElements[1].style.minWidth = "-webkit-min-content"
				flexElements[1].style.justifyContent = "flex-end"

				for(let i = 1; i <= preferences.length; i++) container.appendChild(await new QuickButton("response", i, answerContainer).button)
				header.querySelector(":scope > div > div:nth-of-type(1)").after(container)
			}
		}).catch(log)
	}
})()