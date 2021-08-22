import fs from "fs"
import path from "path"

export default async () => {
	const buildPath = path.resolve(__dirname, "../build")

	if(fs.existsSync(buildPath)) console.log("Removing build folder"), fs.rmSync(buildPath, {
		recursive: true,
		force: true
	})

	if(!fs.existsSync(buildPath)) console.log("Creating build folder"), fs.mkdirSync(buildPath)
}
