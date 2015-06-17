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
      <div className="home row container-full">
          <div className="col-md-2 container-full left-panel">
            <div className="logo">
              <img src="/logo.png" />
              <img src="/basejs.svg" />
            </div>

          </div>
          <div className="col-md-10 container-full right-panel">
            <Bootstrap.Button className="btn-danger" onClick={this.onSignOut}>
              Sign out
            </Bootstrap.Button>

            <UserProfile/>
          </div>
      </div>
    );

  }
});
