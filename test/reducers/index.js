import { combineReducers } from 'redux'
import details from './details'
import todos from './todos'



export default combineReducers({
  details,
  todos
})
