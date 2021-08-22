import { getStorage } from "../../helpers"
import ExpandedLayout from "./ExpandedLayout"

getStorage("expandLayout").then(value => {
	if(value) new ExpandedLayout().listen()
})
