import { getStorage } from "../../helpers"
import ExpandedLayout from "./ExpandedLayout"
import FastReply from "./FastReply"

getStorage("expandLayout").then(value => value && new ExpandedLayout())

new FastReply()
