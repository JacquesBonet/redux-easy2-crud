import * as docs from './docs.js'
import {PATH_TODOS} from '../constants/todos'

export const readTodo = aText => (docs.read( PATH_TODOS))
export const addTodo = aText => (docs.create( PATH_TODOS, { description: aText}))
export const deleteTodo = aDoc => (docs.del( aDoc))
export const editTodo = aDoc => (docs.update(aDoc))
export const completeTodo = (aDoc, complete) => (docs.update( { ...aDoc, complete}))

