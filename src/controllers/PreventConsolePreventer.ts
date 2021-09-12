export default class PreventConsolePreventer {
	console: Console
	date: number
	Listener: number

	constructor(){
		this.console = window.console
		Object.freeze(window.console)

		this.date = Date.now()

		this.Listener = window.setInterval(() => {
			if(this.date + 3e4 < Date.now()) return clearInterval(this.Listener)
			console = this.console
		})
	}
}
