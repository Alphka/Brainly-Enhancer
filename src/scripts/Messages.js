(async function(){
	if(!(await window.ContentScript.executeAction({ action: "getExpandedLayout" }))) return

	const style = document.createElement("style")
	function updateStyle(){
		const innerHeight = window.innerHeight
		style.innerHTML = `
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

	updateStyle()
	window.addEventListener("resize", updateStyle)
	document.head.appendChild(style)
})();