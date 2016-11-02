import log from 'winston'
import {PATH_TODOS} from "../constants/todos"
import docs from "./docs"

const initialState = [];


export default function todos(state = initialState, action) {
    const newState = docs(state, PATH_TODOS, action)

    if (log.level === 'debug' && action.path === PATH_TODOS) {
        log.debug('action = ' + JSON.stringify(action))

        log.debug('state.todos = ' + JSON.stringify(newState))
    }

    return newState
}


