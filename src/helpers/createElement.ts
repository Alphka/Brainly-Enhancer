export type CreateElementOptions = {
	[attribute: string]: any
	innerHTML?: string
	innerText?: string
	textContent?: string
	src?: string
	href?: string
	alt?: string
	title?: string
	type?: string
	class?: string
	id?: string
	children?: HTMLElement[]
}

function createElement<T extends keyof HTMLElementTagNameMap>(tagName: T, options?: CreateElementOptions): HTMLElementTagNameMap[T]

function createElement(tagName: string, options?: CreateElementOptions): HTMLElement

function createElement<T extends keyof HTMLElementTagNameMap>(options?: CreateElementOptions & {
	tagName?: T
}): HTMLElementTagNameMap[T]

function createElement(options?: CreateElementOptions & {
	tagName?: string
}): HTMLElement

function createElement(args: any){
	let element: HTMLElement,
	options: CreateElementOptions
	
	if(typeof args === "string"){
		element = document.createElement(args)
		options = arguments[1] || {}
	}else if(typeof args === "object"){
		element = document.createElement(args.tagName)
		options = args
		delete options.tagName
	}else throw new Error(`args cannot be a type of ${typeof args}`)

	if(options.textContent) element.textContent = options.textContent
	if(options.innerText) element.textContent =  options.innerText
	if(options.innerHTML) element.innerHTML = options.innerHTML
	if(options.children) options.children.forEach(child => element.appendChild(child))
	
	delete options.textContent
	delete options.innerText
	delete options.innerHTML
	delete options.children

	Object.getOwnPropertyNames(options).forEach(attribute => element.setAttribute(attribute, options[attribute]))
	return element
}

export default createElement
