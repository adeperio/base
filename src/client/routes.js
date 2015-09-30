'use strict'
import 'babel/polyfill';
import React from 'react';
import Router from 'react-router';

import App from './components/app';
import UserHome from './components/user-home';
import SignIn from './components/sign-in';
import Error from './components/error';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="user-home" path="/user-home" handler={UserHome}/>
    <Route name="error" path="/error" handler={Error}/>
    <DefaultRoute handler={SignIn}/>
  </Route>
);

module.exports = routes;
