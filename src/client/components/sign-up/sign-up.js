'use strict';
import './sign-up.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';
import UserActions from '../../flux/actions/user-actions';
import UserStore from '../../flux/stores/user-store';
import ActionTypes from '../../flux/constants/action-types';

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    UserStore.on(ActionTypes.SIGNUP_RES, this.goToUserHome);
    UserStore.on(ActionTypes.SIGNUP_ERR, this.onError);
  },

  goToUserHome: function() {
    this.setState({inError: false});
    if(this.context.router) {
      this.context.router.transitionTo('user-home');
    }
  },

  onError: function(){
    this.setState({inError: true});
  },

  getInitialState: function() {
    return {email: '', pass: '', inError: false};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePassChange: function(e) {
    this.setState({pass: e.target.value});
  },
  handleSubmit(event) {
    event.preventDefault()

    var email = this.state.email.trim();
    var pass = this.state.pass.trim();

    if (!pass || !email) {
      return;
    }

    UserActions.signUp(email, pass);
    this.setState({email: '', pass: ''});
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
                  <p className={this.state.inError ? '' : 'hidden'}>There was an error signing up.</p>
                  <form onSubmit={this.handleSubmit}>
                    <Bootstrap.Input
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange} />
                    <Bootstrap.Input
                        type="password"
                        placeholder="Password"
                        value={this.state.pass}
                        onChange={this.handlePassChange}  />
                    <Bootstrap.Button type="submit" className="btn-default sign-up-button">
                      Sign Up
                    </Bootstrap.Button>
                  </form>
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
