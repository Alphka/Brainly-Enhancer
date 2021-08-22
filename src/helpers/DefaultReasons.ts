export default class DefaultReasons {
	ButtonsListener(event: MouseEvent, button: HTMLButtonElement){
		const container: HTMLDivElement = button.parentElement.parentElement.classList.contains("header")
			? button.parentElement.parentElement.parentElement.querySelector(":scope > .contents > .action-delete")
			: button.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(":scope > .action-delete")
	
		const categories = <NodeListOf<HTMLDivElement>>container.querySelectorAll(":scope > div > div:nth-of-type(1) > span.pull-left")
		const mainCategory = <HTMLInputElement>categories[0].querySelector(":scope > input")
	
		mainCategory.click()
		
		const subcategories = <NodeListOf<HTMLDivElement>>container.querySelectorAll(":scope > div > .subs > .subcategories")
		const textarea = <HTMLTextAreaElement>container.querySelector(":scope > div > p:nth-of-type(1) textarea")
	
		textarea.value = subcategories[0].querySelector(":scope > input").getAttribute("z-text")

		const dontReturnPoints = <HTMLInputElement>container.querySelector("input.dont-return-points")
		const takeAnswererPoints = <HTMLInputElement>container.querySelector("input.take-answerers-points")

		if(!dontReturnPoints?.checked) dontReturnPoints?.click()
		if(!takeAnswererPoints?.checked) takeAnswererPoints?.click()
	}
}
