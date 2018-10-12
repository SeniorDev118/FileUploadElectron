import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer as routing, push, routerActions } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

//actions
import userActions from './shared/entities/userActions';
// import assetActions from './shared/entities/assetActions';
// import userActions from './shared/entities/userActions';
// import userActions from './shared/entities/userActions';
// import userActions from './shared/entities/userActions';
// import userActions from './shared/entities/userActions';


//reduces
import appReducer from './reducers'
import userReducer from './shared/entities/userReducer';
//import sidepanelReducer from './components/SidePanel/reducers'
import folderReducer from './shared/entities/folderReducer'
import assetReducer from './shared/entities/assetReducer'
import assetTagReducer from './shared/entities/assetTagReducer'
import tagReducer from './shared/entities/tagReducer'
import authReducer from './shared/entities/authReducer'
import windowReducer from './shared/utils/Window/reducer'

export default function configureStore(initialState, routerHistory) {

  const router = routerMiddleware(routerHistory);
  const actionCreators = {
    ...userActions,
    push,
  };

  const reducers = {
    app: appReducer,
    // sidePanel: sidepanelReducer,
    assets: assetReducer,
    assetTags: assetTagReducer,
    folders: folderReducer,
    tags: tagReducer,
    auth: authReducer,
    window: windowReducer,
    userReducer,
    routing,
  };

  if (!PRODUCTION) {
  }

  const middlewares = [thunk, router];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
