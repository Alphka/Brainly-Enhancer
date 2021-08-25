// @ts-check

import { task, series } from "gulp"

import {
	clean,
	manifest,
	moveFiles,
	scss,
	writeIconsFile
} from "./gulp"

task("build", series(
	clean,
	manifest,
	moveFiles,
	writeIconsFile,
	scss
))
