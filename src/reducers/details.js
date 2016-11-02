import log from 'winston'
import {PATH_DETAILS} from "../constants/details"
import docs from "./docs"

const initialState = []

export default function details( state = initialState, action) {

   const newState =  docs( state, PATH_DETAILS, action)

    if (log.level === 'debug' && action.path === PATH_DETAILS) {
        log.debug('action = ' + JSON.stringify(action))

        log.debug('newState = ' + JSON.stringify(newState))
    }

    return newState
}


