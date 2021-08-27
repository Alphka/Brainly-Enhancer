export const waitForBody = (function(){
	let promise: Promise<HTMLBodyElement>

	return async function(){
		if(document.body) return document.body as HTMLBodyElement
		if(!promise) promise = new Promise(resolve => window.addEventListener("DOMContentLoaded", () => resolve(document.body as HTMLBodyElement)))
		return await promise
	}
})()
