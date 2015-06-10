'use strict';
import './App.less';

import React from 'react';
import Router from 'react-router';
import invariant from 'react/lib/invariant';
import NotFoundPage from '../NotFoundPage';
import Home from '../Home';
import ActionTypes from '../../flux/constants/ActionTypes';
import AuthActions from '../../flux/actions/AuthActions';
import AuthStore from '../../flux/stores/AuthStore';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    AuthStore.on(ActionTypes.REVOKE_RES, this.onRevoke);
  },

  onRevoke: function(){
    if(this.context.router){
      this.context.router.transitionTo('app');
    }
  },

  render() {
    return (
      <div className="App">
        <RouteHandler />
      </div>
    );
  }

});


module.exports = App;
