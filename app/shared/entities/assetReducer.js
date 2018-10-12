import { updateWithItem, removeItem } from '../utils/EntityHelper'
import {
  ASSET_LOADED,
  ASSET_REMOVED,
  ASSETS_LOADED,
  ASSETS_LOAD,
  ASSETS_INVALIDATE
} from './assetActions'

const initialState = {
  items: null,
  isFetching: false
}

function filter(state = initialState, action) {
  switch (action.type) {
  case ASSETS_LOAD:
    return {
      ...state,
      isFetching: true
    }
  case ASSET_LOADED:
    return {
      ...state,
      isFetching: false,
      items: updateWithItem(state.items, action.item)
    }
  case ASSET_REMOVED:
    return {
      ...state,
      isFetching: false,
      items: removeItem(state.items, action.item.id)
    }
  case ASSETS_LOADED:
    return {
      ...state,
      isFetching: false,
      items: action.items
    }
  case ASSETS_INVALIDATE:
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
