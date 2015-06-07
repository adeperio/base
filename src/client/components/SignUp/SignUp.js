'use strict';
import './SignUp.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../Flux/actions/AuthActions';

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
      firstNameValue: this.refs.lastNameValueRef.getValue()
    });
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


                 <Bootstrap.Button className="btn-primary" onClick={this.onSignUp}>Sign up</Bootstrap.Button>


          </div>
      </div>
    );

  }
});
