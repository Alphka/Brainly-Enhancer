import fs from "fs"
import path from "path"

const manifest = {
	manifest_version: 2,
	background: {
		scripts: [
			"background/background.js"
		]
	},
	browser_action: {
		default_popup: "views/popup/index.html"
	},
	content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
	permissions: [
		"tabs",
		"storage",
		"webRequest",
		"webRequestBlocking",
		"*://eodev.com/*",
		"*://znanija.com/*",
		"*://nosdevoirs.fr/*",
		"*://brainly.pl/*",
		"*://brainly.in/*",
		"*://brainly.ph/*",
		"*://brainly.ro/*",
		"*://brainly.com/*",
		"*://brainly.lat/*",
		"*://brainly.co.id/*",
		"*://brainly.com.br/*"
	],
	externally_connectable: {
		matches: [
			"*://eodev.com/*",
			"*://znanija.com/*",
			"*://nosdevoirs.fr/*",
			"*://brainly.pl/*",
			"*://brainly.in/*",
			"*://brainly.ph/*",
			"*://brainly.ro/*",
			"*://brainly.com/*",
			"*://brainly.lat/*",
			"*://brainly.co.id/*",
			"*://brainly.com.br/*"
		]
	},
	web_accessible_resources: [
		"*/*"
	]
}

function firstUppercase(...strings){
	return strings.map(string => string[0].toUpperCase() + string.substr(1))
}

export default async () => {
	const rootPath = path.resolve(__dirname, "..")

	const {
		author,
		name,
		description,
		version
	} = JSON.parse(fs.readFileSync(path.join(rootPath, "package.json")))

	manifest.author = author
	manifest.name = manifest.browser_action.default_title = firstUppercase(...name.split("-")).join(" ")
	manifest.description = description
	manifest.version = version

	fs.appendFileSync(
		path.join(rootPath, "build", "manifest.json"),
		JSON.stringify(manifest, null, 4).replace(/ {4}/, "\t") + "\n", "utf8"
	)
}
