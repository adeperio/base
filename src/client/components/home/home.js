'use strict';
import './home.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../flux/actions/auth-actions';
import UserActions from '../../flux/actions/user-actions';
import AuthStore from '../../flux/stores/auth-store';
import UserStore from '../../flux/stores/user-store';
import ActionTypes from '../../flux/constants/action-types';

import UserProfile from '../user-profile';

//This is the entry point after the auth callback
//see the route map in app.js
export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    var sessionObject = AuthStore.getSessionObject();
    if(!sessionObject.emailAddress){
      this.goToSignup();
    }
  },

  goToSignup: function(){
    if(this.context.router){
      this.context.router.transitionTo('signup');
    }
  },

  onSignOut: function(){
    AuthActions.signOut(AuthStore.getSessionObject());
  },

  render: function() {

    return (
      <div className={'home'}>
          <div className="home-box">
              <UserProfile/>
              <Bootstrap.Button className="btn-danger" onClick={this.onSignOut}>
                Sign out
              </Bootstrap.Button>
          </div>
      </div>
    );

  }
});
