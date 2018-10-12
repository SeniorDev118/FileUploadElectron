'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _app = require('./components/Home/app');

var _app2 = _interopRequireDefault(_app);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Switch,
  null,
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _app2.default })
);
//# sourceMappingURL=routes.js.map