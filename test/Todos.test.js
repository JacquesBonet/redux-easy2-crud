import winston from 'winston'
import configureStore from './stores'
import {PATH_TODOS} from './constants/todos'
import * as actions  from '../src/actions/docs'
import {existIdPromise} from './utils/dbUtils'

winston.level = 'debug';

let initialData = {}

const store = configureStore(initialData)


var id = 1234

describe('createStore', () => {
    it('exposes the public API', () => {

        existIdPromise(PATH_TODOS, id)
            .then(val => {
                console.log('existIdPromise ' + JSON.stringify(val))
                if (val.status == 404) {                                                        // element doesn't exist, create it
                    store.dispatch(actions.create(PATH_TODOS, {description: 'Bonjour', id}))
                }
            })
            .catch((err) => {
                console.log('error :' + JSON.stringify(err))
            })
    })
})

describe('readStore', () => {
    it('exposes the public API', () => {

        store.dispatch(actions.read(PATH_TODOS))
    })
})


describe('updateStore', () => {
    it('exposes the public API', () => {
        existIdPromise(PATH_TODOS, id)
            .then(val => {
                console.log('existIdPromise ' + JSON.stringify(val))
                if (val.status == 200) {                                                        // element exist, update it
                    store.dispatch(actions.update({path: PATH_TODOS, description: 'au revoir', id}))
                }
            })
            .catch((err) => {
                console.log('error :' + JSON.stringify(err))
            })
    })
})


describe('deleteStore', () => {
    it('exposes the public API', () => {
        existIdPromise(PATH_TODOS, id)
            .then(val => {
                console.log('existIdPromise ' + JSON.stringify(val))
                if (val.status == 200) {                                                        // element exist, delete it
                    store.dispatch(actions.del(PATH_TODOS, id))
                }
            })
            .catch((err) => {
                console.log('error :' + JSON.stringify(err))
            })
    })
})

