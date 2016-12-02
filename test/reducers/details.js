import {PATH_DETAILS} from "../constants/details"
import docs from "../../src/reducers/docs"

const initialState = []

export default function details( state = initialState, action) {

   return docs( state, PATH_DETAILS, action);
}


