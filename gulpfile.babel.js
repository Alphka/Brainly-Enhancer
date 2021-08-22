import { task, series, src, dest } from "gulp"
import { default as manifest } from "./gulp/manifest"
import { default as clean } from "./gulp/clean"

task("clean", clean)
task("manifest", manifest)

function moveFiles(){
	const files = [
		{
			src: "./public/**/*.[!js]*",
			dest: "./build"
		}
	]

	return files.map(file => src(file.src).pipe(dest(file.dest))).pop()
}

task("build", series(
	"clean",
	"manifest",
	moveFiles
))
