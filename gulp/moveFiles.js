// @ts-check

import { dest, src } from "gulp"
import path from "path"

export function moveFiles(){
	const files = [
		{
			src: "public/**/*.[!js]*",
			dest: process.env.NODE_ENV === "development" ? "dist" : "build"
		}
	]

	return files.map(file => src(file.src).pipe(dest(file.dest))).pop()
}
