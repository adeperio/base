'use strict';
import './login.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import Router from 'react-router';

import AuthActions from '../../flux/actions/auth-actions';
import AuthStore from '../../flux/stores/auth-store';
import ActionTypes from '../../flux/constants/action-types';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

export default React.createClass({

  propTypes: { },

  componentDidMount: function() {

  },

  onGoToGoogleSignIn: function(){
    window.location = '/auth/connect/google';
  },

  onGoToFacebookSignIn: function(){
    window.location = '/auth/connect/facebook';
  },

  render: function() {

    return (
      <div className={'login'}>
          <div className="login-box">
            <h1>Base</h1>

            <Bootstrap.Button className="btn-danger login-button" onClick={this.onGoToGoogleSignIn}>
              Sign in with Google
            </Bootstrap.Button>
            <Bootstrap.Button className="btn-primary login-button" onClick={this.onGoToFacebookSignIn}>
              Sign in with Facebook
            </Bootstrap.Button>
          </div>

      </div>
    );

  }
});
