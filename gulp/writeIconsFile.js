// @ts-check

import fs from "fs"
import path from "path"

const rootPath = path.resolve(__dirname, ".."),
buildFolder = path.resolve(rootPath, process.env.NODE_ENV === "development" ? "dist" : "build")

export async function writeIconsFile(){
	const script = fs.readFileSync(path.resolve(rootPath + "/gulp/icons.js"), "utf8"),
	icons = fs.readFileSync(path.resolve(rootPath + "/public/images/icons.svg"), "utf8"),
	data = script.replace("<gulpIcons>", icons.replace(/[\r\n\t]/g, ""))

	fs.appendFileSync(path.resolve(buildFolder + "/images/icons.js"), data, "utf8")
}
