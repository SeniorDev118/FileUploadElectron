'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _history = require('history');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./shared/utils/Window/actions');

var _Debounce = require('./shared/utils/Debounce');

var _Debounce2 = _interopRequireDefault(_Debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// global.API_URL = "https://api.alchemy.is";
global.IMAGE_PATH = "d:\\temp";
global.firstApp = true;
global.textLogo = "";
//global.API_URL = "http://alchemy.api";
global.API_URL = "http://devapi.alchemy.is";

global.PRODUCTION = false;
const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if (routing && routing.location) {
    history.replace(routing.location);
  }
};
localStorage.clear();
const initialState = {};
const routerHistory = (0, _history.createMemoryHistory)();
const store = (0, _store2.default)(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

store.dispatch((0, _actions.updateViewportSize)(window.innerWidth, window.innerHeight));
window.addEventListener('resize', (0, _Debounce2.default)(() => {
  store.dispatch((0, _actions.updateViewportSize)(window.innerWidth, window.innerHeight));
}, 300));

/* global PRODUCTION */
if (PRODUCTION) {
  ReactGA.initialize('UA-119133343-1');
}

const rootElement = document.getElementById('app');
_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterRedux.ConnectedRouter,
    { history: routerHistory },
    _routes2.default
  )
), rootElement);
//# sourceMappingURL=index.js.map