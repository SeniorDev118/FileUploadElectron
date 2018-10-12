import { getData } from '../utils/EntityHelper'
import { getRequest } from '../utils/ApiRepository'

export const ASSET_TAG_LOADED = 'ASSET_TAG_LOADED'
export const ASSET_TAG_REMOVED = 'ASSET_TAG_REMOVED'
export const ASSET_TAGS_LOADED = 'ASSET_TAGS_LOADED'
export const ASSET_TAGS_LOAD = 'ASSET_TAGS_LOAD'
export const ASSET_TAGS_INVALIDATE = 'ASSET_TAGS_INVALIDATE'

const request = () => ({ type: ASSET_TAGS_LOAD })
const receiveSingle = item => ({ type: ASSET_TAG_LOADED, item })
const removeSingle = item => ({ type: ASSET_TAG_REMOVED, item })
const receiveAll = items => ({ type: ASSET_TAGS_LOADED, items })

export const invalidateAssetTagsAction = () => ({
  type: ASSET_TAGS_INVALIDATE
})

export const loadAssetTagAction = _id => (dispatch) => {
  const { url } = getData('asset_tags', _id)
  return getRequest(url).then(response => dispatch(receiveSingle(response)))
}

export const loadAssetTagsAction = (paramaters = {}) => (dispatch, getState) => {
  const { items, isFetching } = getState().assetTags
  dispatch(request())
  if (items === null && !isFetching) {
    return getRequest('asset_tags', paramaters).then(response => dispatch(receiveAll(response)))
  }

  return Promise.resolve()
}

export const refreshAssetTagsAction = (paramaters = {}) => dispatch => getRequest('asset_tags', paramaters).then(response => dispatch(receiveAll(response)))

export const setAssetTagsAction = data => dispatch => dispatch(receiveAll(data))
export const removeAssetTagAction = id => dispatch => dispatch(removeSingle({ id }))
