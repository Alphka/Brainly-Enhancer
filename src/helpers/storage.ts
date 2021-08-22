import type { StorageTypes } from "../../typings/global"

export function setStorage(keys: string | string[], value: any, type: StorageTypes = "local"){
	return new Promise(resolve => chrome.runtime.sendMessage(BrainlyEnhancer.extension.id, {
		action: "setStorage",
		data: {
			keys: typeof keys === "string" ? [keys] : keys,
			value,
			type
		}
	}, resolve))
}

function getStorage(key: string, type?: StorageTypes): Promise<any>
function getStorage(keys: string[], type?: StorageTypes): Promise<any[]>
function getStorage(keys: string | string[], type: StorageTypes = "local"){
	return new Promise(resolve => {
		chrome.runtime.sendMessage(BrainlyEnhancer.extension.id, {
			action: "getStorage",
			data: { keys, type }
		}, resolve)
	})
}

export { getStorage }
