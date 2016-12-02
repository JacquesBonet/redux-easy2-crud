import CrudMiddleware from '../../src/middlewares/CrudMiddleware'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'

const crudMiddleware = CrudMiddleware({})
const enhancer = compose(
   // Middleware you want to use in development:
   applyMiddleware(crudMiddleware)
)


export default function configureStore ( initialState, customReducer) {

  const store = createStore(
     customReducer ? customReducer : rootReducer,
     initialState,
     enhancer
  )
  return store
}


