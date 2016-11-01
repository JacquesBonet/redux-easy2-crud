import * as TYPES from "../constants/docs"


export const read = (path) => ({ path, type: TYPES.READ })

export const readSuccess = (path, docs) => ({ path, payload: docs, type: TYPES.READ_SUCCESS})

export const readId = (path, id) => ({ path, id, type: TYPES.READID})

export const readIdSuccess = (path, doc) => ({ path, payload: doc, type: TYPES.READID_SUCCESS})

export const create = (path, doc) => ({path, payload: doc, type: TYPES.CREATE})

export const createSuccess = doc => ({payload: doc, type: TYPES.CREATE_SUCCESS})

export const createOrUpdate = (path, doc) => {
  if (doc.id)
    return update( doc)
  else
    return create( path, doc)
}

export const update = (doc) => ({ payload: doc, type: TYPES.UPDATE})

export const updateSuccess = (doc) => ({ payload: doc, type: TYPES.UPDATE_SUCCESS})

export const del = (doc) => ({ ...doc, type: TYPES.DELETE})

export const delSuccess = (doc)  => ({ payload: doc, type: TYPES.DELETE_SUCCESS})

export const crudError = (type, path, error) => ({type, path, error})
