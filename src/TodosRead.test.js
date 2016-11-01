import configureStore from './stores'
import { combineReducers } from 'redux'
import details from './reducers/details'
import todos from './reducers/todos'
import test from './reducers/test'
import {PATH_TODOS} from './constants/todos'
import * as actions  from './actions/docs'

describe('readStore', () => {
    it('exposes the public API', () => {
        let initialData = {}

        const reducers = combineReducers({
            details,
            todos,
            test
        })

        const store = configureStore(initialData, reducers)

        store.dispatch(actions.read(PATH_TODOS))
    })
})

