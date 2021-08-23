(async function(){
	const container = document.createElement("div")
	container.style.display = "none"
	container.innerHTML = '<gulpIcons>'
	
	if(!document.body) await new Promise(resolve => window.addEventListener("DOMContentLoaded", resolve))
	document.body.firstChild.before(container)
})();
