module.exports = {
	overrides: [
		{
			test: /\.js$/,
			presets: ["@babel/preset-env"],
			plugins: [
				"@babel/plugin-transform-runtime"
			]
		}
	],
	presets: [
		[
			"@babel/preset-env",
			{
				modules: false
			}
		]
	]
}
