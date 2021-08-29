import RedirectPage from "../../helpers/RedirectPage"

let isBusy: boolean

window.addEventListener("keydown", event => {
	if(isBusy) return

	let userId = location.pathname.match(/(?<=\/)\d+/)?.[0],
	url = location.href,
	page = 1
	
	if(!userId) return

	if(location.pathname.includes("/page:")){
		url = location.href.split("/").slice(0, 6).join("/")
		page = Number(location.pathname.split("/").pop().split(":").pop())
	}

	isBusy = true
	RedirectPage(url + "/page:<PageNumber>", page, event)
})
