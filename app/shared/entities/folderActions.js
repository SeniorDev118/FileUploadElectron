import { getData } from '../utils/EntityHelper'
import { getRequest } from '../utils/ApiRepository'

export const FOLDER_LOADED = 'FOLDER_LOADED'
export const FOLDER_REMOVED = 'FOLDER_REMOVED'
export const FOLDERS_LOADED = 'FOLDERS_LOADED'
export const FOLDERS_LOAD = 'FOLDERS_LOAD'
export const FOLDERS_INVALIDATE = 'FOLDERS_INVALIDATE'

const request = () => ({ type: FOLDERS_LOAD })
const receiveSingle = item => ({ type: FOLDER_LOADED, item })
const removeSingle = item => ({ type: FOLDER_REMOVED, item })
const receiveAll = items => ({ type: FOLDERS_LOADED, items })

export const invalidateFoldersAction = () => ({
  type: FOLDERS_INVALIDATE
})

export const loadFolderAction = _id => (dispatch) => {
  const { url } = getData('folders', _id)
  return getRequest(url).then(response => dispatch(receiveSingle(response)))
}

export const loadFoldersAction = (paramaters = {}) => (dispatch, getState) => {
  const { items, isFetching } = getState().folders
  if (items === null && !isFetching) {
    dispatch(request())
    return getRequest('folders', paramaters).then(response => dispatch(receiveAll(response)))
  }

  return Promise.resolve()
}

export const refreshFoldersAction = (paramaters = {}) => dispatch => getRequest('folders', paramaters).then(response => dispatch(receiveAll(response)))

export const setFoldersAction = data => dispatch => dispatch(receiveAll(data))
export const removeFolderAction = id => dispatch => dispatch(removeSingle({ id }))
