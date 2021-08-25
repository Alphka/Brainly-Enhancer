// @ts-check

import { dest, src } from "gulp"
import gulpPlumber from "gulp-plumber"
import magicImporter from "node-sass-magic-importer"
import gulpSass from "gulp-dart-sass"
import path from "path"

const stylesFolder = path.resolve(__dirname, "../" + (process.env.NODE_ENV === "development" ? "dist" : "build"), "styles")

export function scss(){
	const files = [
		"src/styles/*.scss"
	]

	const gulpSassStream = gulpSass.sync({
		outputStyle: process.env.NODE_ENV === "development" ? "expanded" : "compressed",
		includePaths: [
			"node_modules",
			".."
		],
		importer: [
			magicImporter()
		]
	}).on("error", gulpSass.logError)
	
	return src(files)
		.pipe(gulpPlumber())
		.pipe(gulpSassStream)
		.pipe(dest(stylesFolder))
}
