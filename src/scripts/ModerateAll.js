const { waitElement } = BrainlyEnhancer

class TopPlayer {
	constructor(callback){
		this.callback = callback
		this.opened = false
		this.mutation = new MutationObserver(this.listener.bind(this))

		waitElement("div#toplayer").then(toplayer => {
			this.toplayer = toplayer
			this.mutation.observe(toplayer, {
				childList: true,
				subtree: true,
				arguments: true
			})
		})
	}
	listener(mutations, observer){
		for(const mutation of mutations) if(!this.toplayer.classList.contains("hidden")){
			if(this.opened) return
			this.opened = true
			this.callback(true, { mutation, observer })
		}else if(this.opened){
			this.opened = false
			this.callback(false, { mutation, observer })
		}
	}
}

new TopPlayer(async (isOpened, details) => {
	if(!isOpened) return

	const deleteButtons = Array.from(await waitElement(".btn.btn-danger.delete", true))
	for(const button of deleteButtons) button.addEventListener("click", e => getSubCategoryText(button.parentElement.parentElement.parentElement), {
		once: true
	})
})

function getSubCategoryText(container){
	const mainContainer = container.querySelector(":scope > .contents > .action-delete > div"),
	textarea = mainContainer.querySelector(":scope > p:first-of-type > textarea"),
	text = mainContainer.querySelector(":scope > .subs > .subcategories > input").getAttribute("z-text")

	mainContainer.querySelector(":scope > div:first-of-type > span.pull-left > input").click()
	return textarea.value = text
}