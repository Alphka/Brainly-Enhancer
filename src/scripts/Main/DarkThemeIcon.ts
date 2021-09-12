import { createElement, waitElement } from "../../../src/helpers"

export default class DarkTheme {
	isBusy: boolean
	container: HTMLUListElement | HTMLDivElement
	element: HTMLButtonElement | HTMLAnchorElement
	image: string

	async AppendIcon(){
		this.image = `${BrainlyEnhancer.extension.URL}/images/moon.png`

		if(document.documentElement.id === "html"){
			const li = createElement("li", {
				class: "menu-element",
				children: [
					this.element = createElement("a", {
						"data-track": "brainly-enhancer-dark-theme-icon",
						textContent: "Dark theme"
					})
				]
			})

			document.head.appendChild(createElement("style", {
				innerHTML: `.menu-element > a[data-track="brainly-enhancer-dark-theme-icon"]::before{background-image: url(${this.image});}`
			}))

			this.container = <HTMLUListElement>(await waitElement(".mint-header__right.mint-hide-for-mobile.menu-right > ul.menu-list"))
			this.container.firstElementChild.before(li)
		}else{
			const div = createElement("div", {
				class: "sg-flex",
				children: [
					this.element = createElement("button", {
						class: "sg-button sg-button--m sg-button--transparent sg-button--icon-only",
						children: [
							createElement("span", {
								class: "sg-button__icon sg-button__icon--m",
								children: [
									createElement("div", {
										class: "sg-icon sg-icon--adaptive sg-icon--x24",
										children: [
											createElement("img", {
												class: "sg-icon__svg",
												src: this.image
											})
										]
									})
								]
							})
						]
					})
				]
			})

			this.container = <HTMLDivElement>(await waitElement("div[class*=HeaderController__childrenWrapper] > div > div:nth-of-type(2) > div"))
			this.container.firstElementChild?.before(div)
		}

		this.element.addEventListener("click", this.listener.bind(this))
	}
	listener(e: Event){
		e.preventDefault()

		if(this.isBusy) return
		this.isBusy = true

		return new Promise<boolean>(resolve => {
			window.addEventListener("darkThemeChanged", (event: CustomEvent) => {
				if(!event.detail.success) BrainlyEnhancer.Error("Algo deu errado")

				this.isBusy = false
				resolve(event.detail.success)
			}, {once: true})

			window.dispatchEvent(new CustomEvent("toggleDarkTheme"))
		})
	}
}
