import todosReducer from './todos'
import detailsReducer from './details'

const initialState = {
    todos: [],
    details: []
}

export default function test( state = initialState, action) {

    const todos = todosReducer( state.todos, action)

    const details = detailsReducer( state.details, action)

    console.log( 'action.path = ' + action.path + ' action.type = ' + action.type + ' action.payload = ' + JSON.stringify(action.payload))

    console.log( 'state.todos = ' + JSON.stringify(todos))

    console.log( 'state.details = ' + JSON.stringify(details))

    return { todos, details}
}


