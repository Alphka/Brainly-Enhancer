import fs from "fs"
import path from "path"
import { task, series, src, dest } from "gulp"
import { default as manifest } from "./gulp/manifest"
import { default as clean } from "./gulp/clean"

task("clean", clean)
task("manifest", manifest)

const buildFolder = process.env.NODE_ENV === "development" ? "./dist" : "./build"

function moveFiles(){
	const files = [
		{
			src: "./public/**/*.[!js]*",
			dest: buildFolder
		}
	]

	return files.map(file => src(file.src).pipe(dest(file.dest))).pop()
}

async function writeIconsFile(){
	const script = fs.readFileSync(path.resolve(__dirname, "./gulp/icons.js"), "utf8")
	const icons = fs.readFileSync(path.resolve(__dirname, "./public/images/icons.svg"), "utf8")
	const data = script.replace("<gulpIcons>", icons.replace(/[\r\n\t]/g, ""))
	fs.appendFileSync(path.resolve(__dirname, `${buildFolder}/images/icons.js`), data, "utf8")
}

task("build", series(
	"clean",
	"manifest",
	moveFiles,
	writeIconsFile
))
