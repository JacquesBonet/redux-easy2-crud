import log from 'winston'
import {PATH_DETAILS} from "../constants/details"
import docs from "./docs"

const initialState = []

export default function details( state = initialState, action) {

   return docs( state, PATH_DETAILS, action);
}


