export default class ExtendedMessagesLayout {
	style: HTMLStyleElement

	constructor(){
		this.style = document.createElement("style")
		this.updateStyle()
		window.addEventListener("resize", this.updateStyle.bind(this))
		document.head.appendChild(this.style)
	}
	updateStyle(){
		const innerHeight = window.innerHeight

		return this.style.innerHTML = `
			.brn-messages__conversations,
			.brn-messages__chatbox{
				height: ${innerHeight - 161}px!important;
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

			@media (min-width: 1024px){
				.js-page-wrapper > .sg-layout > .sg-layout__container{
					padding: 0;
				}
			}
			
			.js-page-wrapper > .sg-layout > .sg-layout__container{
				max-width: unset;
				margin: 0!important;
			}

			@media (min-width: 768px){
				.sg-layout__container{
					border-radius: 0!important;
				}
			}
		`.replace(/[\n\t\r]+/g, "")
	}
}
