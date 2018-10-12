import { updateWithItem, removeItem } from '../utils/EntityHelper'
import {
  FOLDER_LOADED,
  FOLDER_REMOVED,
  FOLDERS_LOADED,
  FOLDERS_LOAD,
  FOLDERS_INVALIDATE
} from './folderActions'

const initialState = {
  items: null,
  isFetching: false
}

function filter(state = initialState, action) {
  switch (action.type) {
  case FOLDERS_LOAD:
    return {
      ...state,
      isFetching: true
    }
  case FOLDER_LOADED:
    return {
      ...state,
      isFetching: false,
      items: updateWithItem(state.items, action.item)
    }
  case FOLDER_REMOVED:
    return {
      ...state,
      isFetching: false,
      items: removeItem(state.items, action.item.id)
    }
  case FOLDERS_LOADED:
    return {
      ...state,
      isFetching: false,
      items: action.items
    }
  case FOLDERS_INVALIDATE:
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
