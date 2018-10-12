'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reduxActions = require('redux-actions');

var _userActions = require('./userActions');

var _userActions2 = _interopRequireDefault(_userActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxActions.handleActions)({
  [_userActions2.default.login]: (state, action) => {
    return (0, _extends3.default)({}, state, action.payload);
  },
  [_userActions2.default.logout]: (state, action) => {
    return (0, _extends3.default)({}, state, action.payload);
  }
}, {});
//# sourceMappingURL=userReducer.js.map