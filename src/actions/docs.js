import * as TYPES from "../constants/docs"


/**
 * Read action
 * @param path   The path to read. The path permits to identify the ressource to read
 */
export const read = (path) => ({ path, type: TYPES.READ })

export const readSuccess = (path, docs) => ({ path, docs, type: TYPES.READ_SUCCESS})

/**
 * Creation ation
 * @param path   The path corresponding to the ressource to create
 * @param doc   The doc object to create
 */
export const create = (path, doc) => ({ ...doc, path, type: TYPES.CREATE})

/**
 * Success creation
 * @param doc   The object created. A path and id attribute has been injected on the object which will permit to identify its category
 */
export const createSuccess = doc => ({...doc, type: TYPES.CREATE_SUCCESS})

/**
 * Update CRUD action
 * @param doc   The ressource to modify. This ressource must contains a path attribut permitting to identify its type and a id attribute
 */
export const update = (doc) => ({ ...doc, type: TYPES.UPDATE})

export const updateSuccess = (doc) => ({ ...doc, type: TYPES.UPDATE_SUCCESS})

/**
 * Del CRUD action
 * @param path   The path corresponding to the ressource to delete
 * @param id   The id of the object to delete
 */
export const del = (path, id) => ({ path, id, type: TYPES.DELETE})

export const delSuccess = (doc)  => ({ ...doc, type: TYPES.DELETE_SUCCESS})

export const crudError = (type, path, error) => ({type, path, error})


export const createOrUpdate = (path, doc) => {
    if (doc.id)
        return update( doc)
    else
        return create( path, doc)
}
