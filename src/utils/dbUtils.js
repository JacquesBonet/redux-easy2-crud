import isoFetch from "isomorphic-fetch"

const ROOT_PATH = 'http://localhost:3001/';

export function existIdPromise( path, id) {
    const fullPath = ROOT_PATH + path + '/' + id

    return isoFetch( fullPath, 'get', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}