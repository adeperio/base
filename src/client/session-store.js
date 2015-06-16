'use strict'

import Session from './flux/models/session.js';

//These are global functions to get access to a session object
//Note: setSessionGlobal gets called
//and it's parameters are rendered in the index.jade file after a successful sign in from Express
function SessionStore(){

  this.globalSession = new Session();

  this.setSessionGlobal = function(accessToken, emailAddress) {
    this.globalSession.accessToken = accessToken;
    this.globalSession.emailAddress = emailAddress;
  };

  this.getSessionGlobal = function(){
    return this.globalSession;
  };
}

module.exports = SessionStore;
