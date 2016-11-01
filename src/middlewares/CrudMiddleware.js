require('es6-promise').polyfill();
import isoFetch from "isomorphic-fetch"
import * as TYPES  from '../constants/docs'
import * as docActions  from '../actions/docs'


function parseJSON(response) {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    }

    return response;
}

function checkError(response) {
    if (response.ok === false || response.status >= 400) {
        const error = new Error(response.status);
        error.response = response;
        console.log( 'error = ' + error)
        throw error;
    }

    return response;
}

const ROOT_PATH = 'http://localhost:3001/';

export function rawFetchPromise( url, method = 'GET', body = undefined) {
    return isoFetch( ROOT_PATH + url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
   .then(parseJSON)
   .then(checkError);
}


export default function createCrudMiddleware() {

    const config = {
        readStart,
        readIdStart,
        createStart,
        updateStart,
        delStart
    };
    return store => {
        config.dispatch = store.dispatch
        return next => action => {
            const returnValue = next(action)

            switch (action.type) {
                case TYPES.READ:
                    config.readStart(action.path)
                    break
                case TYPES.READID:
                    config.readIdStart(action.path, action.id)
                    break
                case TYPES.CREATE:
                    config.createStart(action)
                    break
                case TYPES.DELETE:
                    config.delStart(action)
                    break
                case TYPES.UPDATE:
                    config.updateStart(action)
                    break
            }
            return returnValue
        }
    }

    /**
     *
     * @param path   the path to read. path is the type of doc to read
     */
    function readStart(path) {
        console.log( 'readStart')
        return rawFetchPromise( path)
            .then(result => {
                console.log( 'readSuccess =' + JSON.stringify(result))
                config.dispatch(docActions.readSuccess(path, result))
            })
            .catch(err => {
                console.log( 'readError =' + err)
                config.dispatch(docActions.crudError(TYPES.READ_ERROR, path, err))
            });
    }

    /**
     *
     * @param path   the path to read. path is the type of doc to read
     * @param id     id of the document to search
     */
    function readIdStart(path, id) {
        return rawFetchPromise( path + '/' + id)
            .then(result => {
                config.dispatch(docActions.readIdSuccess(path, result))
            })
            .catch(err => {
                config.dispatch(docActions.crudError(TYPES.READID_ERROR, path, err))
            });
    }


    function createStart(path, doc) {
        return rawFetchPromise( path, 'post', doc)
            .then(result => {
                config.dispatch(docActions.createSuccess(path, result))
            })
            .catch(err => {
                config.dispatch(docActions.crudError(TYPES.CREATE_ERROR, path, err))
            });
    }

    function updateStart(aDoc) {
        return rawFetchPromise( aDoc.path, 'put', aDoc)
            .then(result => {
                config.dispatch(docActions.updateSuccess(aDoc.path, result))
            })
            .catch(err => {
                config.dispatch(docActions.crudError(TYPES.UPDATE_ERROR, aDoc.path, err))
            });
    }

    function delStart(aDoc) {
        return rawFetchPromise( aDoc.path, 'del', aDoc)
            .then(result => {
                config.dispatch(docActions.delSuccess(aDoc.path, result))
            })
            .catch(err => {
                config.dispatch(docActions.crudError(TYPES.DELETE_ERROR, aDoc.path, err))
            });
    }
}


