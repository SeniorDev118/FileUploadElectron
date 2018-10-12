'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = configureStore;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxLocalstorage = require('redux-localstorage');

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _userActions = require('./shared/entities/userActions');

var _userActions2 = _interopRequireDefault(_userActions);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _userReducer = require('./shared/entities/userReducer');

var _userReducer2 = _interopRequireDefault(_userReducer);

var _reducers3 = require('./components/SidePanel/reducers');

var _reducers4 = _interopRequireDefault(_reducers3);

var _folderReducer = require('./shared/entities/folderReducer');

var _folderReducer2 = _interopRequireDefault(_folderReducer);

var _assetReducer = require('./shared/entities/assetReducer');

var _assetReducer2 = _interopRequireDefault(_assetReducer);

var _assetTagReducer = require('./shared/entities/assetTagReducer');

var _assetTagReducer2 = _interopRequireDefault(_assetTagReducer);

var _tagReducer = require('./shared/entities/tagReducer');

var _tagReducer2 = _interopRequireDefault(_tagReducer);

var _authReducer = require('./shared/entities/authReducer');

var _authReducer2 = _interopRequireDefault(_authReducer);

var _reducer = require('./shared/utils/Window/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//actions
function configureStore(initialState, routerHistory) {

  const router = (0, _reactRouterRedux.routerMiddleware)(routerHistory);
  const actionCreators = (0, _extends3.default)({}, _userActions2.default, {
    push: _reactRouterRedux.push
  });

  const reducers = {
    app: _reducers2.default,
    sidePanel: _reducers4.default,
    assets: _assetReducer2.default,
    assetTags: _assetTagReducer2.default,
    folders: _folderReducer2.default,
    tags: _tagReducer2.default,
    auth: _authReducer2.default,
    window: _reducer2.default,
    userReducer: _userReducer2.default,
    routing: _reactRouterRedux.routerReducer
  };

  if (!PRODUCTION) {}

  const middlewares = [_reduxThunk2.default, router];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return _redux.compose;
  })();

  const enhancer = composeEnhancers((0, _redux.applyMiddleware)(...middlewares), (0, _reduxLocalstorage2.default)());
  const rootReducer = (0, _redux.combineReducers)(reducers);

  return (0, _redux.createStore)(rootReducer, initialState, enhancer);
}
// import assetActions from './shared/entities/assetActions';
// import userActions from './shared/entities/userActions';
// import userActions from './shared/entities/userActions';
// import userActions from './shared/entities/userActions';
// import userActions from './shared/entities/userActions';


//reduces
//# sourceMappingURL=store.js.map