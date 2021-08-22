export default class ExtendedMessagesLayout {
	style: HTMLStyleElement

	constructor(){
		this.style = document.createElement("style")
		this.updateStyle()

		document.head.appendChild(this.style)
	}
	listen(){
		window.addEventListener("resize", this.updateStyle.bind(this))
	}
	updateStyle(){
		const innerHeight = window.innerHeight

		return this.style.innerHTML = `
			.brn-messages__conversations,
			.brn-messages__chatbox{
				height: ${innerHeight - 161}px;
			}
			.brn-messages__conversations .brn-messages__list{
				height: ${innerHeight - 260}px;
				max-height: unset;
				min-height: unset;
			}
			.brn-messages__chatbox .brn-chatbox__chat{
				height: ${innerHeight - 270}px;
				min-height: unset;
				max-height: unset;
			}
		`
	}
}
