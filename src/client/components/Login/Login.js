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

  getInitialState: function() {
    return {
      emailValue: ''
    };
  },

  componentDidMount: function() {

  },

  onEmailValueChange: function(){

    this.setState({
      emailValue: this.refs.emailValueRef.getValue()
    });

  },


  render: function() {

    var connectPath = '/oauth/connect/' + this.state.emailValue;

    return (
      <div className={'login'}>
          <div className="login-box">
            <h1>Base</h1>

              <Bootstrap.Input
                   type='text'
                   value={this.state.emailValue}
                   placeholder='Enter your email'
                   hasFeedback
                   ref='emailValueRef'
                   groupClassName='group-class'
                   wrapperClassName='wrapper-class'
                   labelClassName='label-class'
                   onChange={this.onEmailValueChange} />

                 <a href={connectPath}>Sign in with your email</a>
          </div>

      </div>
    );

  }
});
