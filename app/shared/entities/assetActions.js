import { getData } from '../utils/EntityHelper'
import { getRequest } from '../utils/ApiRepository'
import { getTagId, getFolderId, isTagRoute, isFolderRoute } from '../utils/LocationHelper'

export const ASSET_LOADED = 'ASSET_LOADED'
export const ASSET_REMOVED = 'ASSET_REMOVED'
export const ASSETS_LOADED = 'ASSETS_LOADED'
export const ASSETS_LOAD = 'ASSETS_LOAD'
export const ASSETS_INVALIDATE = 'ASSETS_INVALIDATE'

const request = () => ({ type: ASSETS_LOAD })
const receiveSingle = item => ({ type: ASSET_LOADED, item })
const removeSingle = item => ({ type: ASSET_REMOVED, item })
const receiveAll = items => ({ type: ASSETS_LOADED, items })

const getTagData = (assetTags) => {
  const data = {}
  assetTags.forEach((assetTag, index) => {
    data[`assetTags[${index}]`] = assetTag.id
  })

  return data
}

const getFolderData = (pathname) => {
  const folderId = getFolderId(pathname)
  return folderId !== 'bucket' ? { folder: folderId } : { 'folder[exists]': false }
}

export const invalidateAssetsAction = () => ({
  type: ASSETS_INVALIDATE
})

export const loadAssetAction = _id => (dispatch) => {
  const { url } = getData('assets', _id)
  return getRequest(url).then(response => dispatch(receiveSingle(response)))
}

export const loadAssetsAction = () => (dispatch, getState) => {
  const { assets, router } = getState()
  const pathname = router.location.pathname

  if (assets.items === null && !assets.isFetching) {
    dispatch(request())

    if (isTagRoute(pathname) && getTagId(pathname) !== 'tags') {
      getRequest('asset_tags', { tag: getTagId(pathname) }).then((assetTags) => {
        const data = getTagData(assetTags)
        if (Object.keys(data).length) {
          return getRequest('assets', data).then((response) => {
            dispatch(receiveAll(response))
          })
        }
        dispatch(receiveAll([]))
      })
    } else if (isFolderRoute(pathname)) {
      return getRequest('assets', getFolderData(pathname)).then((response) => {
        dispatch(receiveAll(response))
      })
    } else {
      dispatch(receiveAll([]))
    }
  }

  return Promise.resolve()
}

export const refreshAssetsAction = () => (dispatch, getState) => {
  const { router } = getState()
  const pathname = router.location.pathname

  if (isTagRoute(pathname) && getTagId(pathname) !== 'tags') {
    getRequest('asset_tags', { tag: getTagId(pathname) }).then((assetTags) => {
      const data = getTagData(assetTags)
      if (Object.keys(data).length) {
        return getRequest('assets', data).then((response) => {
          dispatch(receiveAll(response))
        })
      }
      dispatch(receiveAll([]))
    })
  } else if (isFolderRoute(pathname)) {
    return getRequest('assets', getFolderData(pathname)).then((response) => {
      dispatch(receiveAll(response))
    })
  } else {
    dispatch(receiveAll([]))
    return Promise.resolve()
  }
}

export const setAssetsAction = data => dispatch => dispatch(receiveAll(data))
export const removeAssetAction = id => dispatch => dispatch(removeSingle({ id }))
