import { updateWithItem, removeItem } from '../utils/EntityHelper'
import {
  ASSET_TAG_LOADED,
  ASSET_TAG_REMOVED,
  ASSET_TAGS_LOADED,
  ASSET_TAGS_LOAD,
  ASSET_TAGS_INVALIDATE
} from './assetTagActions'

const initialState = {
  items: null,
  isFetching: false
}

function filter(state = initialState, action) {
  switch (action.type) {
  case ASSET_TAGS_LOAD:
    return {
      ...state,
      isFetching: true
    }
  case ASSET_TAG_LOADED:
    return {
      ...state,
      isFetching: false,
      items: updateWithItem(state.items, action.item)
    }
  case ASSET_TAG_REMOVED:
    return {
      ...state,
      isFetching: false,
      items: removeItem(state.items, action.item.id)
    }
  case ASSET_TAGS_LOADED:
    return {
      ...state,
      isFetching: false,
      items: action.items
    }
  case ASSET_TAGS_INVALIDATE:
    return {
      ...state,
      isFetching: false,
      items: initialState.items
    }
  default:
    return state
  }
}

export default filter
