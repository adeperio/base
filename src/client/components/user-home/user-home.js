'use strict';
import './user-home.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import UserActions from '../../flux/actions/user-actions';
import UserStore from '../../flux/stores/user-store';
import ActionTypes from '../../flux/constants/action-types';
import UserProfile from '../user-profile';
import UserItems from '../user-items';

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    UserStore.on(ActionTypes.SIGNOUT_RES, this.goToLogin);
    UserStore.on(ActionTypes.SIGNOUT_ERR, this.goToError);
  },

  goToError: function(){
    if(this.context.router){
      console.log('Navigating to error...');
      this.context.router.transitionTo('error');
    }
  },

  goToLogin: function(){
    if(this.context.router){
      console.log('Navigating home...');
      this.context.router.transitionTo('app');
    }
  },

  signOut: function(){
    UserActions.signOut();
  },


  render: function() {

    return (
      <div className="user-home row container-full">
          <div className="col-lg-2 container-full left-panel">
            <div className="logo">
              <img src="/logo.png" />
              <img src="/basejs.svg" />
            </div>
            <div className="features">
              <h2>Features</h2>
              <h3>
                The Stack:
              </h3>
              <ul>
                <li>ReactJS+Flux</li>
                <li>React-router</li>
                <li>WebPack+Gulp </li>
                <li>Postgres </li>
                <li>Express/NodeJS</li>
              </ul>

              <h3>
                Security:
              </h3>
              <ul>
                <li>PassportJS for OAuth2</li>
                <li>Social logins (Google, Facebook)</li>
                <li>HelmetJS for http protections</li>
                <li>TLS/SSL by default</li>
                <li>XSS scripting protection</li>
                <li>CSRF tokens</li>
                <li>Secure sessions</li>
              </ul>
            </div>
            <div className="footer">
              <div className="fine-print">
                <p>Created by @wearejoan</p>
              </div>
            </div>
          </div>
          <div className="col-lg-10 container-full right-panel">
            <div className="row">
              <div className="header-panel col-lg-2 col-lg-offset-10">
                <Bootstrap.Button className="btn-default" onClick={this.signOut}>
                  Sign out
                </Bootstrap.Button>
              </div>
            </div>
            <div className="row">
              <div className="user-panel col-lg-2 col-lg-offset-5">
                <UserProfile/>
              </div>
              <div className="user-items-panel col-lg-6 col-lg-offset-3">
                <UserItems />
              </div>
            </div>
          </div>
      </div>
    );

  }
});
