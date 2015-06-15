'use strict'
import 'babel/polyfill';
import React from 'react';
import Router from 'react-router';

import App from './components/app';
import Home from './components/home';
import SignUp from './components/sign-up';
import Login from './components/login';
import Error from './components/error';

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
    <Redirect from="/auth/google/callback" to="/home" />
    <DefaultRoute handler={Login}/>
  </Route>
);

module.exports = routes;
