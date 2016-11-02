import winston from 'winston'
import cuid from 'cuid'
import configureStore from './stores'
import {PATH_TODOS} from './constants/todos'
import * as actions  from './actions/docs'

winston.level = 'debug';

let initialData = {}

const store = configureStore(initialData)


var id = 0

describe('createStore', () => {
    it('exposes the public API', () => {

        id = cuid()

        store.dispatch(actions.create( PATH_TODOS, { description: 'Bonjour', id}))
    })
})

describe('readStore', () => {
    it('exposes the public API', () => {

        store.dispatch( actions.read(PATH_TODOS))
    })
})


describe('updateStore', () => {
    it('exposes the public API', () => {

        store.dispatch( actions.update( { path: PATH_TODOS, description: 'au revoir', id}))
    })
})

/*
describe('deleteStore', () => {
    it('exposes the public API', () => {

        store.dispatch( actions.del( PATH_TODOS, id))
    })
})


    */