export default function isNumber(arg: string){
	if(!arg) return false

	const number = Number(arg)
	return Number.isFinite(number) && !Number.isNaN(number)
}
