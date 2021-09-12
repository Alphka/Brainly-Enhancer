export default function RedirectPage(url: string, page: number, event: KeyboardEvent){
	let isReplaced: boolean

	const Replace = (page: number | string) => {
		url = url.replace("<PageNumber>", String(page))
		isReplaced = true
	}
	const Test = (arg: RegExp | string) => {
		if(arg instanceof RegExp){
			const string = arg.toString()
			const match = `^${string.substring(1, string.length - 1)}$`
			arg = new RegExp(match, "i")
		}else arg = new RegExp(`^${arg}$`, "i")

		return arg.test(event.key)
	}

	if(Test(/ArrowRight|d/)) Replace(++page)
	if(Test(/ArrowLeft|a/)) Replace(--page)
	if(Test(/ArrowUp|w/)) Replace(page + 10)
	if(Test(/ArrowDown|s/)) Replace(page - 10)
	if(/^Numpad\d+/.test(event.code)) Replace(Number(event.key) || 10)

	if(isReplaced) location.href = url
}
