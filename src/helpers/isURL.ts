export default (string: string) => {
	try{
		return Boolean(typeof string === "string" && string.includes(".") && new URL(string).hostname)
	}catch(error){
		return false
	}
}
