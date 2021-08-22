import { waitElement, DefaultReasons as _DefaultReasons } from "../../helpers"
import TopPlayer from "./Toplayer"

async function TopLayerCallback(isOpened: boolean){
	if(!isOpened) return

	const deleteButtons = <NodeListOf<HTMLButtonElement>>(await waitElement(".btn.btn-danger.delete", {
		multiple: true
	}))

	const DefaultReasons = new _DefaultReasons()
	Array.from(deleteButtons).forEach(button => {
		button.addEventListener("click", event => DefaultReasons.ButtonsListener(event, button), {once: true})
	})
}

new TopPlayer(TopLayerCallback)

export { TopLayerCallback }
