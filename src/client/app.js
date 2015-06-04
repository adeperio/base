'use strict';

import 'babel/polyfill';
import React from 'react';
import emptyFunction from 'react/lib/emptyFunction';
import App from './components/App';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Error from './components/Error';
import Router from 'react-router';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" path="/home" handler={Home}/>
    <Route name="signup" path="/signup" handler={SignUp}/>
    <Route name="error" path="/error" handler={Error}/>
    <Redirect from="/oauth/callback" to="/home" />
    <DefaultRoute handler={Login}/>
  </Route>
);

function run() {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(run);
