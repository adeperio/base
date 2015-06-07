'use strict';
import './App.less';

import React from 'react';
import Router from 'react-router';
import invariant from 'react/lib/invariant';
import NotFoundPage from '../NotFoundPage';
import Home from '../Home';
import ActionTypes from '../../Flux/constants/ActionTypes';
import AuthActions from '../../Flux/actions/AuthActions';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },


  propTypes: { },

  render() {
    return (
      <div className="App">
        <RouteHandler />
      </div>
    );
  }

});


module.exports = App;
