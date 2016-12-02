import {PATH_TODOS} from "../constants/todos"
import docs from "../../src/reducers/docs"

const initialState = [];


export default function todos(state = initialState, action) {
   return docs(state, PATH_TODOS, action);
}


