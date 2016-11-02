import winston from 'winston'
import cuid from 'cuid'
import configureStore from './stores'
import {PATH_TODOS} from './constants/todos'
import * as actions  from './actions/docs'
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
                if (val.status == 404) {
                    store.dispatch(actions.create(PATH_TODOS, {description: 'Bonjour', id}))
                }
            })
            .catch((err) => { // element doesn't exist, create it
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

        store.dispatch(actions.update({path: PATH_TODOS, description: 'au revoir', id}))
    })
})

describe('deleteStore', () => {
    it('exposes the public API', () => {

        store.dispatch(actions.del(PATH_TODOS, id))
    })
})
