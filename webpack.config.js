const path = require("path")
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin")

function addFolderToEntries(entries){
	return Object.fromEntries(Object.getOwnPropertyNames(entries).map(entry => [
		entries[entry].split("/")[2] + "/" + entry,
		entries[entry]
	]))
}

/** @type {import("webpack").Configuration} */
module.exports = {
	mode: "production",
	entry: {
		...addFolderToEntries(WebpackWatchedGlobEntries.getEntries(["./src/scripts/**/index.ts"], {
			ignore: [
				"./src/helpers/*",
				"./src/controllers/*"
			]
		})()),
		...WebpackWatchedGlobEntries.getEntries([
			"./src/*.ts",
			"./src/*[!scripts]/*.ts"
		])(),
		...addFolderToEntries(WebpackWatchedGlobEntries.getEntries(["./public/views/**/*.js"])())
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, process.env.NODE_ENV === "development" ? "dist" : "build")
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				parser: {
					system: false
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".ts"],
		fallback: {
			path: require.resolve("path-browserify")
		}
	},
	performance: {
		hints: false
	}
}
