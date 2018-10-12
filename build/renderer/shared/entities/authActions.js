'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INVALIDATE_AUTHENTICATED_USER = exports.AUTHENTICATED_USER_LOADED = exports.LOAD_AUTHENTICATED_USER = undefined;
exports.invalidateAuthenticatedUser = invalidateAuthenticatedUser;
exports.fetchAuthenticatedUserIfNeeded = fetchAuthenticatedUserIfNeeded;

var _ApiRepository = require('../utils/ApiRepository');

const LOAD_AUTHENTICATED_USER = exports.LOAD_AUTHENTICATED_USER = 'LOAD_AUTHENTICATED_USER';
const AUTHENTICATED_USER_LOADED = exports.AUTHENTICATED_USER_LOADED = 'AUTHENTICATED_USER_LOADED';
const INVALIDATE_AUTHENTICATED_USER = exports.INVALIDATE_AUTHENTICATED_USER = 'INVALIDATE_AUTHENTICATED_USER';

function requestAuthenticatedUser() {
  return {
    type: LOAD_AUTHENTICATED_USER
  };
}

function receiveAuthenticatedUser(user) {
  return {
    type: AUTHENTICATED_USER_LOADED,
    user
  };
}

function fetchAuthenticatedUser() {
  return dispatch => {
    dispatch(requestAuthenticatedUser());
    return (0, _ApiRepository.getRequest)('auths/status').then(response => {
      if (response.authenticated === true) {
        return (0, _ApiRepository.getRequest)('users/me').then(response => {
          dispatch(receiveAuthenticatedUser(response.id ? response : { authenticated: false }));
        });
      }
      dispatch(receiveAuthenticatedUser({ authenticated: false }));
    }).catch(() => {
      dispatch(receiveAuthenticatedUser({ authenticated: false }));
    });
  };
}

function shouldFetchAuthenticatedUser(state) {
  return state.auth == null || state.auth.user === null; // && state.auth.isFetching === false
}

function invalidateAuthenticatedUser() {
  return {
    type: INVALIDATE_AUTHENTICATED_USER
  };
}

function fetchAuthenticatedUserIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAuthenticatedUser(getState())) {
      return dispatch(fetchAuthenticatedUser());
    }
    return null;
  };
}
//# sourceMappingURL=authActions.js.map