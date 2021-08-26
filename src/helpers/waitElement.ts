type WaitElementOptions = {
	multiple?: boolean
	/**
	 * Where to search
	 * @default document
	 */
	element?: HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
	/** How long the loop will last */
	expires?: number
	/** @default true */
	noError?: boolean
}

function waitElement<T extends keyof HTMLElementTagNameMap>(
	selector: T,
	options?: WaitElementOptions & {
		multiple?: false
		noError?: false
	}): Promise<HTMLElementTagNameMap[T]>

function waitElement<T extends keyof HTMLElementTagNameMap>(
	selector: T,
	options?: WaitElementOptions & {
		multiple: true
		noError?: false
	}): Promise<NodeListOf<HTMLElementTagNameMap[T]>>

function waitElement(
	selector: string,
	options?: WaitElementOptions & {
		multiple?: false
		noError?: false
	}): Promise<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>

function waitElement(
	selector: string,
	options?: WaitElementOptions & {
		multiple: true
		noError?: false
	}): Promise<NodeListOf<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>>

function waitElement<T extends keyof HTMLElementTagNameMap>(
	selector: T,
	options?: WaitElementOptions & {
		multiple?: false
		expires: number
		noError: true
	}): Promise<HTMLElementTagNameMap[T] & {
		isError: boolean
	}>

function waitElement<T extends keyof HTMLElementTagNameMap>(
	selector: T,
	options?: WaitElementOptions & {
		multiple: true
		expires: number
		noError: true
	}): Promise<NodeListOf<HTMLElementTagNameMap[T]> & {
		isError: boolean
	}>

function waitElement(
	selector: string,
	options?: WaitElementOptions & {
		multiple?: false
		expires: number
		noError: true
	}): Promise<HTMLElementTagNameMap[keyof HTMLElementTagNameMap] & {
		isError: boolean
	}>

function waitElement(
	selector: string,
	options?: WaitElementOptions & {
		multiple: true
		expires: number
		noError: true
	}): Promise<NodeListOf<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]> & {
		isError: boolean
	}>

function waitElement(selector: string, options?: WaitElementOptions){
	const begin = Date.now(),
	element = options?.element || document

	return new Promise((resolve, reject) => {
		const interval = window.setInterval(() => {
			if(element.querySelector(selector)){
				clearInterval(interval)
				return resolve(Object.assign(options?.multiple ? element.querySelectorAll(selector) : element.querySelector(selector), {
					isError: false
				}))
			}

			if(options?.expires && Date.now() >= options.expires + begin){
				clearInterval(interval)
				if(options.noError) resolve({ isError: true })
				else reject()
			}
		})
	})
}

export default waitElement
