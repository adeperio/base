'use strict';
import './Login.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import Router from 'react-router';

import AuthActions from '../../Flux/actions/AuthActions';
import AuthStore from '../../Flux/stores/AuthStore';
import ActionTypes from '../../Flux/constants/ActionTypes';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

export default React.createClass({

  propTypes: { },

  componentDidMount: function() {

  },

  render: function() {

    var connectPath = '/auth/connect/';

    return (
      <div className={'login'}>
          <div className="login-box">
            <h1>Base</h1>
            <a href={connectPath}>Sign in with Google</a>
          </div>

      </div>
    );

  }
});
