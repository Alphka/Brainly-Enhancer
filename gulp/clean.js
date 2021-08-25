import fs from "fs"
import path from "path"

export async function clean(){
	const folder = process.env.NODE_ENV === "development" ? "dist" : "build"
	const buildPath = path.resolve(__dirname, `../${folder}`)

	if(fs.existsSync(buildPath)) console.log(`Removing files from ${folder} folder`), fs.rmSync(buildPath, {
		recursive: true,
		force: true
	})

	if(!fs.existsSync(buildPath)) console.log(`Creating ${folder} folder`), fs.mkdirSync(buildPath)
}
