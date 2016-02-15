'use strict';
import './sign-up.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';

export default React.createClass({


  onSignUp: function(){
    window.location = '/auth/connect/facebook';
  },

  render: function() {

    var signInUrl = '/';

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
                  <div className="col-md-6 col-md-offset-3">
                    <Bootstrap.Input type="email" placeholder="Email" />
                    <Bootstrap.Input type="password" placeholder="Password" />
                    <Bootstrap.Button className="btn-default sign-up-button" onClick={this.onSignUp}>
                      Sign Up
                    </Bootstrap.Button>
                    <a href={signInUrl}>Already Registered? Sign in here. </a>
                  </div>
                  <div className="col-md-6 col-md-offset-3">

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
