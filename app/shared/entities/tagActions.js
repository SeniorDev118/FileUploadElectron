import { getData } from '../utils/EntityHelper'
import { getRequest } from '../utils/ApiRepository'

export const TAG_LOADED = 'TAG_LOADED'
export const TAG_REMOVED = 'TAG_REMOVED'
export const TAGS_LOADED = 'TAGS_LOADED'
export const TAGS_LOAD = 'TAGS_LOAD'
export const TAGS_INVALIDATE = 'TAGS_INVALIDATE'

const request = () => ({ type: TAGS_LOAD })
const receiveSingle = item => ({ type: TAG_LOADED, item })
const removeSingle = item => ({ type: TAG_REMOVED, item })
const receiveAll = items => ({ type: TAGS_LOADED, items })

export const invalidateTagsAction = () => ({
  type: TAGS_INVALIDATE
})

export const loadTagAction = _id => (dispatch) => {
  const { url } = getData('tags', _id)
  return getRequest(url).then(response => dispatch(receiveSingle(response)))
}

export const loadTagsAction = (paramaters = {}) => (dispatch, getState) => {
  const { items, isFetching } = getState().tags
  dispatch(request())
  if (items === null && !isFetching) {
    return getRequest('tags', paramaters).then(response => dispatch(receiveAll(response)))
  }

  return Promise.resolve()
}

export const refreshTagsAction = (paramaters = {}) => dispatch => getRequest('tags', paramaters).then(response => dispatch(receiveAll(response)))

export const setTagsAction = data => dispatch => dispatch(receiveAll(data))
export const removeTagAction = id => dispatch => dispatch(removeSingle({ id }))
