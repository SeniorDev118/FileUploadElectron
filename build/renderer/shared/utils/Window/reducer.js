'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = filter;

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  width: 0,
  height: 0
};

function filter(state = initialState, { type, payload }) {
  switch (type) {
    case _actions.UPDATE_VIEWPORT_SIZE:
      {
        return (0, _extends3.default)({}, state, {
          width: payload.width,
          height: payload.height
        });
      }
    default:
      {
        return state;
      }
  }
}
//# sourceMappingURL=reducer.js.map