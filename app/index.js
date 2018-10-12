import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import routes from './routes';
import configureStore from './store';
import { updateViewportSize } from './shared/utils/Window/actions'
import Debounce from './shared/utils/Debounce'

const {app} = require('electron').remote

// global.API_URL = "https://api.alchemy.is";
// global.IMAGE_PATH = app.getPath('pictures');
global.IMAGE_PATH = app.getPath('desktop');

global.textLogo = ""
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
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

store.dispatch(updateViewportSize(window.innerWidth, window.innerHeight))
window.addEventListener(
  'resize',
  Debounce(() => {
    store.dispatch(updateViewportSize(window.innerWidth, window.innerHeight))
  }, 300)
)

/* global PRODUCTION */
if (PRODUCTION) {
  ReactGA.initialize('UA-119133343-1')
}

const rootElement = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
