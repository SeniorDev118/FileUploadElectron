import { getRequest } from '../utils/ApiRepository'

export const LOAD_AUTHENTICATED_USER = 'LOAD_AUTHENTICATED_USER'
export const AUTHENTICATED_USER_LOADED = 'AUTHENTICATED_USER_LOADED'
export const INVALIDATE_AUTHENTICATED_USER = 'INVALIDATE_AUTHENTICATED_USER'

function requestAuthenticatedUser() {
  return {
    type: LOAD_AUTHENTICATED_USER
  }
}

function receiveAuthenticatedUser(user) {
  return {
    type: AUTHENTICATED_USER_LOADED,
    user
  }
}

function fetchAuthenticatedUser() {
  return (dispatch) => {
    dispatch(requestAuthenticatedUser())
    return getRequest('auths/status').then((response) => {
      if (response.authenticated === true) {
        return getRequest('users/me').then((response) => {
          dispatch(receiveAuthenticatedUser(response.id ? response : { authenticated: false }))
        })
      }
      dispatch(receiveAuthenticatedUser({ authenticated: false }))
    }).catch(() => {
      dispatch(receiveAuthenticatedUser({ authenticated: false }))
    })
  }
}

function shouldFetchAuthenticatedUser(state) {
  return (state.auth==null || state.auth.user === null)// && state.auth.isFetching === false
}

export function invalidateAuthenticatedUser() {
  return {
    type: INVALIDATE_AUTHENTICATED_USER
  }
}

export function fetchAuthenticatedUserIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAuthenticatedUser(getState())) {
      return dispatch(fetchAuthenticatedUser())
    }
    return null
  }
}
