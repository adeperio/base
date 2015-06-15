'use strict'

function Session(){

  this._id = '';
  this.user = null; //a User object
  this.baseToken = ''; //access token managed by Base
  this.providerToken = ''; //token provided by auth provider, if any
  this.providerName = ''; //ie google, twitter, see provider-lookup.js
  this.providerUserId = ''; //the user identifier provided by the auth provider
  this.created = null;
}

module.exports = Session;
