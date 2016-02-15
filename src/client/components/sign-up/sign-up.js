'use strict';
import './sign-up.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';

export default React.createClass({

  onGoToGoogleSignIn: function(){
    window.location = '/auth/connect/google';
  },

  onGoToFacebookSignIn: function(){
    window.location = '/auth/connect/facebook';
  },

  render: function() {

    var signUpUrl = '/signup';

    return (
      <div className="sign-up-container">
        <div className={'sign-up'}>
            <div className="sign-up-box">
              <div className="row header">
                <div className="col-md-4 col-md-offset-4">
                  <img src="/logo.png" />
                </div>
              </div>
              <div className="row header">
                <div className="col-md-2 col-md-offset-5">
                  <img src="/basejs.svg" />
                </div>
              </div>
              <div className="row header-tagline">
                <div className="col-md-12">
                    <h2>
                      An open-source, security focused, web application starter kit.<br/>Built with ReactJS, Flux, Express, and Postgres.
                    </h2>
                </div>
              </div>
              <div className="row">
              <div className="col-md-10 col-md-offset-2 sign-up-area">
                <div className="col-md-10 sign-up-area">
                  <Bootstrap.Input type="email" placeholder="Email" />
                  <Bootstrap.Input type="password" placeholder="Password" />
                </div>
                <div className="col-md-5 col-md-offset-5">
                  <Bootstrap.Button className="btn-default sign-up-button" onClick={this.onGoToGoogleSignIn}>
                    Sign Up
                  </Bootstrap.Button>
                </div>
              </div>

              </div>

            </div>
        </div>
        <div className="footer">
          <div className="fine-print">
            <div className="row ">
              <div className="col-md-2 col-md-offset-5">
                <p>Created by @wearejoan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );

  }
});
