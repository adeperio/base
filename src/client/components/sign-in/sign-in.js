'use strict';
import './sign-in.less';

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

    return (
      <div className="sign-in-container">
        <div className={'sign-in'}>
            <div className="sign-in-box">
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
              <div className="row header">
                <div className="col-md-12">
                    <h2>
                      An open-source, security focused, web application starter kit. <br/>Built with ReactJS, Flux, Express, and Postgres.
                    </h2>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4 col-md-offset-2">
                  <Bootstrap.Button className="btn-danger sign-in-button" onClick={this.onGoToGoogleSignIn}>
                    Sign in with Google
                  </Bootstrap.Button>
                </div>
                <div className="col-md-4 ">
                  <Bootstrap.Button className="btn-primary sign-in-button" onClick={this.onGoToFacebookSignIn}>
                    Sign in with Facebook
                  </Bootstrap.Button>
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
