import * as docs from './docs.js'

export const addTodo = aText => (docs.create( 'todos', aText))
export const deleteTodo = aDoc => (docs.del( aDoc))
export const editTodo = aDoc => (docs.update(aDoc))
export const completeTodo = aDoc => (docs.update( { ...aDoc, completeTodo}))
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
