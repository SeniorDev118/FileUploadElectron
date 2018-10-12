'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _authActions = require('./authActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  user: null,
  isFetching: false
};

function filter(state = initialState, action) {
  console.log('initialState');
  console.log(initialState);
  console.log(action);
  switch (action.type) {
    case _authActions.LOAD_AUTHENTICATED_USER:
      return (0, _extends3.default)({}, state, {
        isFetching: true,
        user: initialState.user
      });
    case _authActions.AUTHENTICATED_USER_LOADED:
      return (0, _extends3.default)({}, state, {
        isFetching: false,
        user: action.user
      });
    case _authActions.INVALIDATE_AUTHENTICATED_USER:
      return (0, _extends3.default)({}, state, {
        isFetching: false,
        user: initialState.user
      });
    default:
      return state;
  }
}

exports.default = filter;
//# sourceMappingURL=authReducer.js.map