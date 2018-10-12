'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  initialLoad: true
};

function filter(state = initialState, action) {
  switch (action.type) {
    case _actions.INITIAL_LOAD:
      return (0, _extends3.default)({}, state, {
        initialLoad: action.initialLoad
      });
    default:
      return state;
  }
}

exports.default = filter;
//# sourceMappingURL=reducers.js.map