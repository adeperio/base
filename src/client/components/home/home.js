'use strict';
import './home.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../flux/actions/auth-actions';
import AuthStore from '../../flux/stores/auth-store';
import UserActions from '../../flux/actions/user-actions';
import UserStore from '../../flux/stores/user-store';
import ActionTypes from '../../flux/constants/action-types';
import UserProfile from '../user-profile';

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    AuthStore.on(ActionTypes.SIGNOUT_RES, this.onSignOutResponse);
  },

  onSignOutResponse: function(){
    if(this.context.router){
      this.context.router.transitionTo('app');
    }
  },


  signOut: function(){
    AuthActions.signOut();
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
            <div className="row">
              <div className="header-panel col-md-2 col-md-offset-10">
                <Bootstrap.Button className="btn-default" onClick={this.signOut}>
                  Sign out
                </Bootstrap.Button>
              </div>
            </div>
            <div className="row">
              <div className="user-panel col-md-2 col-md-offset-5">
                <UserProfile/>
              </div>
            </div>
          </div>
      </div>
    );

  }
});
