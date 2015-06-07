'use strict';
import './Home.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../Flux/actions/AuthActions';
import AuthStore from '../../Flux/stores/AuthStore';

//This is the entry point after the auth callback
//see the route map in app.js
export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    var sessionObject = AuthStore.getSessionObject();
    if(!sessionObject.email_address){
      this.goToSignup();
    }
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

    return (
      <div className={'home'}>
          <div className="home-box">
              <h1>Welcome to your Base</h1>
              <img src="/logo.png" />
              <Bootstrap.Button className="btn-danger" onClick={this.onSignOut}>
                Sign out
              </Bootstrap.Button>
          </div>
      </div>
    );

  }
});
