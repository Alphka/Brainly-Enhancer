const { checkPrivileges, createElement, waitElement } = BrainlyEnhancer

// Remove annoying popup
if(!localStorage.getItem("registration-toplayer/expires")){
	localStorage.setItem("registration-toplayer/expires", String(Date.now() + 3.6e6))
	localStorage.setItem("registration-toplayer/cursor", "0")
}