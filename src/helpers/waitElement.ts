type WaitElementOptions = {
	multiple?: boolean
	/** Where to search, default: `document` */
	element?: HTMLElement
}

function waitElement<T extends keyof HTMLElementTagNameMap>(
	selector: T,
	options?: WaitElementOptions & {
		multiple?: false
	}): Promise<HTMLElementTagNameMap[T]>

function waitElement<T extends keyof HTMLElementTagNameMap>(
	selector: T,
	options?: WaitElementOptions & {
		multiple: true
	}): Promise<NodeListOf<HTMLElementTagNameMap[T]>>

function waitElement(
	selector: string,
	options?: WaitElementOptions & {
		multiple?: false
	}): Promise<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>

function waitElement(
	selector: string,
	options?: WaitElementOptions & {
		multiple: true
	}): Promise<NodeListOf<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>>

function waitElement(selector: string, options?: WaitElementOptions){
	const element = options?.element || document

	return new Promise(resolve => {
		const interval = window.setInterval(() => element.querySelector(selector) && (
			clearInterval(interval),
			resolve(options?.multiple ? element.querySelectorAll(selector) : element.querySelector(selector))
		))
	})
}

export default waitElement
