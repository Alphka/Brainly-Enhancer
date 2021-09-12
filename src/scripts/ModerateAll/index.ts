import { waitElement, DefaultReasons as _DefaultReasons } from "../../helpers"
import ModerateAllQuickButtons from "./QuickButtons"
import Toplayer from "./Toplayer"

let isCloseListener = false

export async function TopLayerCallback(isOpened: boolean){
	if(!isOpened) return

	if(!isCloseListener){
		isCloseListener = true

		window.addEventListener("keyup", e => {
			if(e.key === "Escape"){
				const closeButton = document.querySelector("#toplayer .contener.mod.moderation .close") as HTMLDivElement
				if(closeButton) closeButton.click()
			}
		})
	}

	const deleteButtons = <NodeListOf<HTMLButtonElement>>(await waitElement(".btn.btn-danger.delete", {
		multiple: true
	}))

	const DefaultReasons = new _DefaultReasons()
	Array.from(deleteButtons).forEach(button => {
		button.addEventListener("click", event => DefaultReasons.ButtonsListener(event, button), {once: true})
	})
}

new Toplayer(TopLayerCallback)
new ModerateAllQuickButtons()
