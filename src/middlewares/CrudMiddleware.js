import isoFetch from "isomorphic-fetch"
import log from 'winston'
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
        log.error( 'error = ' + error)
        throw error;
    }

    return response;
}

const ROOT_PATH = 'http://localhost:3001/';

export function rawFetchPromise( url, method = 'GET', body = undefined) {
    const fullPath = ROOT_PATH + url
    log.debug( 'isoFetch, url = ' + fullPath + ' method = ' + method + ' body = ' + JSON.stringify(body))
    return isoFetch( fullPath, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
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
                    config.createStart(action.path, action)
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
        return rawFetchPromise( path)
            .then(result => {
                log.debug( 'readSuccess')
                config.dispatch(docActions.readSuccess(path, result))
            })
            .catch(err => {
                log.error( 'readError =' + err)
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
                log.debug( 'readIdSuccess')
                config.dispatch(docActions.readIdSuccess(path, result))
            })
            .catch(err => {
                log.debug( 'readIdError =' + err)
                config.dispatch(docActions.crudError(TYPES.READID_ERROR, path, err))
            });
    }


    function createStart(path, doc) {
        log.debug( 'createStart path = ' + path + ' doc = ' + JSON.stringify(doc))
        return rawFetchPromise( path, 'post', doc)
            .then(result => {
                log.debug( 'createSuccess')
                config.dispatch(docActions.createSuccess(path, result))
            })
            .catch(err => {
                log.debug( 'createError =' + err)
                config.dispatch(docActions.crudError(TYPES.CREATE_ERROR, path, err))
            });
    }

    function updateStart(aDoc) {
        return rawFetchPromise( aDoc.path + '/' + aDoc.id, 'put', aDoc)
            .then(result => {
                log.debug( 'updateSuccess')
                config.dispatch(docActions.updateSuccess(aDoc.path, result))
            })
            .catch(err => {
                log.debug( 'updateError =' + err)
                config.dispatch(docActions.crudError(TYPES.UPDATE_ERROR, aDoc.path, err))
            });
    }

    function delStart(aDoc) {
        return rawFetchPromise( aDoc.path + '/' + aDoc.id, 'delete', aDoc)
            .then(result => {
                log.debug( 'deleteSuccess')
                config.dispatch(docActions.delSuccess(aDoc.path, result))
            })
            .catch(err => {
                log.debug( 'deleteError =' + err)
                config.dispatch(docActions.crudError(TYPES.DELETE_ERROR, aDoc.path, err))
            });
    }
}


