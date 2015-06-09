'use strict';
import './Home.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../Flux/actions/AuthActions';
import UserActions from '../../Flux/actions/UserActions';
import AuthStore from '../../Flux/stores/AuthStore';
import UserStore from '../../Flux/stores/UserStore';
import ActionTypes from '../../Flux/constants/ActionTypes';

//This is the entry point after the auth callback
//see the route map in app.js
export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      me: null
    };
  },

  componentDidMount: function() {
    UserStore.on(ActionTypes.ME_RES, this.onGetMe);
    var sessionObject = AuthStore.getSessionObject();
    if(!sessionObject.email_address){
      this.goToSignup();
    } else{
      UserActions.getMe(sessionObject);
    }
  },

  onGetMe: function(){
    this.setState({
      me: UserStore.getMe()
    });
  },

  goToHome: function(){
    if(this.context.router){
      this.context.router.transitionTo('home');
    }
  },

  goToSignup: function(){
    if(this.context.router){
      this.context.router.transitionTo('signup');
    }
  },

  goToError: function(){
    if(this.context.router){
      this.context.router.transitionTo('error');
    }
  },

  onSignOut: function(){
    AuthActions.signOut(AuthStore.getSessionObject());

  },

  render: function() {

    var welcomeString = 'Welcome to your Base';

    if(this.state.me){
      welcomeString = 'Welcome to your Base, ' + me.first_name;
    }

    return (
      <div className={'home'}>
          <div className="home-box">
              <h1>{welcomeString}</h1>
              <img src="/logo.png" />
              <Bootstrap.Button className="btn-danger" onClick={this.onSignOut}>
                Sign out
              </Bootstrap.Button>
          </div>
      </div>
    );

  }
});
