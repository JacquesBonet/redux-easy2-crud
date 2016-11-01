import todosReducer from './todos'
import detailsReducer from './details'

const initialState = {
    todos: [],
    details: []
}

export default function test( state = initialState, action) {

    const todos = todosReducer( state.todos, action)

    const details = detailsReducer( state.details, action)

    console.log( 'action = ' + JSON.stringify(action))

    if (state.todos)
        console.log( 'state.todos = ' + JSON.stringify(todos))

    if (state.details)
        console.log( 'state.details = ' + JSON.stringify(details))

    return { todos, details}
}


