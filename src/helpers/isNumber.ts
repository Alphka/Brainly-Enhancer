export default function isNumber(arg: string){
	if(!arg || !["number", "string"].includes(typeof arg) || !String(arg).length) return false

	const number = Number(arg)
	return Number.isFinite(number) && !Number.isNaN(number)
}
