'use strict';
import './app.less';

import React from 'react';
import Router from 'react-router';
import invariant from 'react/lib/invariant';
import Home from '../home';
import ActionTypes from '../../flux/constants/action-types';
import AuthActions from '../../flux/actions/auth-actions';
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({

  componentDidMount: function() { },

  render() {
    return (
      <div className="App">
        <RouteHandler />
      </div>
    );
  }

});


module.exports = App;
