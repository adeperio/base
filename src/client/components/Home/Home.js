'use strict';
import './Home.less';

import React from 'react';
import AuthActions from '../../Flux/actions/AuthActions';

//This is the entry point after the auth callback
//see the route map in app.js
export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    if(this.context.router){
      var sessionObject = getSessionObject(); //global get session function
      if(sessionObject){
        AuthActions.setSessionObject(sessionObject);

        if(!sessionObject.email_address){
          this.goToSignup();
        }

      } else{
        this.onApplicationError();
      }
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

  render: function() {

    return (
      <div className={'home'}>
          <div className="home-box">
              <h1>Welcome to your Base</h1>
              <img src="/logo.png" />
          </div>
      </div>
    );

  }
});
