'use strict';
import './sign-up.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';

import AuthActions from '../../flux/actions/auth-actions';
import AuthStore from '../../flux/stores/auth-store';
import ActionTypes from '../../flux/constants/action-types';


export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      firstNameValue: '',
      lastNameValue: '',
      emailValue: ''
    };
  },

  propTypes: { },

  componentDidMount: function() {
    AuthStore.on(ActionTypes.SIGNUP_RES, this.onUserSignedUpSuccess);
    AuthStore.on(ActionTypes.SIGNUP_ERR, this.onUserSignedUpError);

  },

  onUserSignedUpSuccess: function(){

    if(this.context.router){
      //get session
      console.log('onUserSignedUpSuccess');
      this.context.router.transitionTo('home');
    }
  },

  onUserSignedUpError: function(){
    if(this.context.router){
      this.context.router.transitionTo('error');
    }
  },

  onEmailValueChange: function(){

    this.setState({
      emailValue: this.refs.emailValueRef.getValue()
    });

  },

  onFirstNameChange: function(){
    this.setState({
      firstNameValue: this.refs.firstNameValueRef.getValue()
    });
  },

  onLastNameChange: function(){
    this.setState({
      lastNameValue: this.refs.lastNameValueRef.getValue()
    });
  },

  onSignUp: function(){

    AuthActions.signUp(AuthStore.getSessionObject(),
                        this.state.firstNameValue,
                        this.state.lastNameValue,
                        this.state.emailValue);
  },

  onSignOut: function(){

    AuthActions.signOut(AuthStore.getSessionObject());

  },

  render: function() {


    return (
      <div className={'signup'}>
          <div className="signup-box">
              <h1>Looks like this is your first time,</h1>
              <h1>sign yourself up!</h1>

              <Bootstrap.Input
                   type='text'
                   value={this.state.firstNameValue}
                   placeholder='First Name'
                   hasFeedback
                   ref='firstNameValueRef'
                   groupClassName='group-class'
                   wrapperClassName='wrapper-class'
                   labelClassName='label-class'
                   onChange={this.onFirstNameChange} />

             <Bootstrap.Input
                  type='text'
                  value={this.state.lastNameValue}
                  placeholder='Last Name'
                  hasFeedback
                  ref='lastNameValueRef'
                  groupClassName='group-class'
                  wrapperClassName='wrapper-class'
                  labelClassName='label-class'
                  onChange={this.onLastNameChange} />

              <Bootstrap.Input
                   type='text'
                   value={this.state.emailValue}
                   placeholder='Email'
                   hasFeedback
                   ref='emailValueRef'
                   groupClassName='group-class'
                   wrapperClassName='wrapper-class'
                   labelClassName='label-class'
                   onChange={this.onEmailValueChange} />


                 <Bootstrap.Button className="btn-primary sign-up-button" onClick={this.onSignUp}>
                Sign up
              </Bootstrap.Button>

              <Bootstrap.Button className="btn-danger sign-up-button" onClick={this.onSignOut}>
                Sign out
              </Bootstrap.Button>


          </div>
      </div>
    );

  }
});
