import { isURL } from "."

const brainlyHostnames = [
	"brainly.com.br",
	"brainly.lat",
	"brainly.com",
	"brainly.pl",
	"eodev.com",
	"nosdevoirs.fr",
	"brainly.in",
	"brainly.co.id",
	"znanija.com",
	"brainly.ro",
	"brainly.ph"
]

export default (url: URL | string) => {
	if(!url) return false
	
	if(typeof url === "string"){
		if(!isURL(url)) return false
		url = new URL(url)
	}

	return brainlyHostnames.includes(url.hostname)
}
