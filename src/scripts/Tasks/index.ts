import { DefaultReasons as _DefaultReasons } from "../../helpers"
import QuestionPage from "./QuestionPage"

function ListenToToplayer(){
	const DefaultReasons = new _DefaultReasons()

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if(!mutation.addedNodes.length || !(mutation.target instanceof HTMLElement)) return

			if(mutation.target.id === "moderate-task-toplayer" && mutation.type === "childList"){
				const deleteButtons = <NodeListOf<HTMLButtonElement>>document.querySelectorAll("button.btn.btn-mini.btn-danger.delete")

				deleteButtons.forEach(button => button.addEventListener("click", event => DefaultReasons.ButtonsListener(event, button), {
					once: true
				}))
			}
		})
	})

	observer.observe(document.body, {
		attributes: true,
		childList: true,
		subtree: true
	})
}

BrainlyEnhancer.isModerator.then(result => {
	if(!result) return

	if(BrainlyEnhancer.checkPrivileges(102)){
		new QuestionPage()
		ListenToToplayer()
	}
})
