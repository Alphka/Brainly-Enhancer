export default function(object: string){
	return new Promise(resolve => {
		const interval = setInterval(() => {
			const element = eval(object)
			if(element){
				clearInterval(interval)
				resolve(element)
			}
		})
	})
}
