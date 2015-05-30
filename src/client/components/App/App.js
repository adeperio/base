'use strict';
import './App.less';

import React from 'react';
import Router from 'react-router';
import invariant from 'react/lib/invariant';

import NotFoundPage from '../NotFoundPage';
import Home from '../Home';
import ActionTypes from '../../Flux/constants/ActionTypes';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    // EmailStore.on(ActionTypes.EMAIL_GET_THREADS_RES_ERR, this.onApplicationError);
    // EmailStore.on(ActionTypes.EMAIL_GET_MSGS_RES_ERR, this.onApplicationError);
  },

  onApplicationError: function(){
    if(this.context.router){
      this.context.router.transitionTo('error');
    }
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
