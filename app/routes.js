import React from 'react';
import withTracking from './shared/utils/withTracker'
import App from './app'
import { Route, Switch } from 'react-router'
import Home from './components/Home/Home';
import Login  from './components/Auth/components/Login/Login';
import Logout from './components/Auth/components/Logout/Logout';

export default (
  <Switch>
    <Route exact path="/" component={withTracking(Login)} />
    <Route path="/login" component={withTracking(Login)} />   
    <Route path="/logout" component={withTracking(Logout)} />
    <Route path="/welcome" component={withTracking(App)} />
  </Switch>
);



