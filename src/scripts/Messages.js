const { createElement } = BrainlyEnhancer

// Expand messages' page
document.head.appendChild(createElement("style", {
	innerHTML: `
		.brn-messages__conversations, .brn-messages__chatbox{
			height: ${window.innerHeight - 158}px;
		}
		section.brn-messages__conversations ul.brn-messages__list{
			height: ${window.innerHeight - 260}px;
			max-height: unset;
			min-height: unset;
		}
		.brn-messages__chatbox .brn-chatbox__chat{
			height: ${window.innerHeight - 270}px;
			min-height: unset;
			max-height: unset;
		}
		@media (min-width: 1024px){
			.sg-layout__container{
				max-width: unset;
				padding: 0;
				margin: 0;
			}
		}
		@media (min-width: 768px){
			.sg-layout__box{
				margin: 0;
			}
		}
		.brn-layout-box{
			margin-bottom: 0;
		}
		.brn-messages__tip{
			margin-top: 0;
		}
	`
}))