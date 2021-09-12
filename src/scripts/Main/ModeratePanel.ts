import { waitElement } from "../../helpers"

const ModeratePanel = (function(){
	let isOldLayout: boolean = false,
	promise: Promise<void>,
	BrainlyMenuContainer: HTMLDivElement,
	MenuList: HTMLUListElement

	function WaitMenu(){
		if(promise) return promise

		return promise = new Promise<void>(async resolve => {
			isOldLayout = document.documentElement.id === "html"

			if(isOldLayout){
				BrainlyMenuContainer = <HTMLDivElement>await waitElement("#moderate-functions-panel > .panel > .content-scroll")
				MenuList = <HTMLUListElement>await waitElement("#moderate-functions > ul", {
					element: BrainlyMenuContainer
				})
			}else{
				BrainlyMenuContainer = <HTMLDivElement>await waitElement(".brn-moderation-panel__list")
				MenuList = <HTMLUListElement>await waitElement("ul.sg-menu-list", {
					element: BrainlyMenuContainer
				})
			}

			resolve()
		})
	}

	async function AddItem(item: HTMLElement){
		await WaitMenu()
		MenuList.appendChild(item)
	}

	// Webpack always returns false
	function IsOldLayout(){
		return isOldLayout
	}

	return {
		WaitMenu,
		AddItem,
		IsOldLayout
	}
})()

export default ModeratePanel
