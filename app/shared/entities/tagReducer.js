import { updateWithItem, removeItem } from '../utils/EntityHelper'
import {
  TAG_LOADED,
  TAG_REMOVED,
  TAGS_LOADED,
  TAGS_LOAD,
  TAGS_INVALIDATE
} from './tagActions'

const initialState = {
  items: null,
  isFetching: false
}

function filter(state = initialState, action) {
  switch (action.type) {
  case TAGS_LOAD:
    return {
      ...state,
      isFetching: true
    }
  case TAG_LOADED:
    return {
      ...state,
      isFetching: false,
      items: updateWithItem(state.items, action.item)
    }
  case TAG_REMOVED:
    return {
      ...state,
      isFetching: false,
      items: removeItem(state.items, action.item.id)
    }
  case TAGS_LOADED:
    return {
      ...state,
      isFetching: false,
      items: action.items
    }
  case TAGS_INVALIDATE:
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
