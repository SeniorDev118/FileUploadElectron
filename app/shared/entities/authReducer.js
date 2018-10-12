import {
  LOAD_AUTHENTICATED_USER,
  AUTHENTICATED_USER_LOADED,
  INVALIDATE_AUTHENTICATED_USER
} from './authActions'

const initialState = {
  user: null,
  isFetching: false
}

function filter(state = initialState, action) {
  console.log('initialState')
  console.log(initialState);
  console.log(action);
  switch (action.type) {
  case LOAD_AUTHENTICATED_USER:
    return {
      ...state,
      isFetching: true,
      user: initialState.user
    }
  case AUTHENTICATED_USER_LOADED:
    return {
      ...state,
      isFetching: false,
      user: action.user
    }
  case INVALIDATE_AUTHENTICATED_USER:
    return {
      ...state,
      isFetching: false,
      user: initialState.user
    }
  default:
    return state
  }
}

export default filter
