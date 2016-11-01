import configureStore from './stores'
import { combineReducers } from 'redux'
import details from './reducers/details'
import todos from './reducers/todos'
import test from './reducers/test'
import * as todoActions  from './actions/todo'

describe('createStore', () => {
    it('exposes the public API', () => {
        let initialData = {}

        const reducers = combineReducers({
            details,
            todos,
            test
        })

        const store = configureStore(initialData, reducers)

        store.dispatch(todoActions.addTodo('Bonjour'))
    })
})

