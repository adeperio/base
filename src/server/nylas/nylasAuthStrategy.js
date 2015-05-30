'use strict'

import request from 'request-promise';

function NylasAuthStrategy(){

  this.clientId = 'CLIENT_ID';
  this.clientSecret = 'CLIENT_SECRET';
  this.authServer = 'https://www.authserver.com';
  this.apiUrl = 'https://api.base.com';
  this.redirectUri = 'http://localhost:3000/oauth/callback';
  this.trial = false;

  this.urlForAuthentication = function(email){

      var login_hint = email;

      if (login_hint == null) {
        login_hint = '';
      }

      return this.authServer +
          '/oauth/authorize?client_id=' + this.clientId +
          '&trial=' + this.trial +
          '&response_type=code&scope=email' +
          '&login_hint=' + login_hint +
          '&redirect_uri=' + this.redirectUri;
  };

  this.exchangeCodeForToken = function(code) {

      if (code == null) {
        throw new Error("exchangeCodeForToken() must be called with a code");
      }

      var uri = this.authServer +
          '/oauth/token?client_id=' + this.clientId +
          '&client_secret=' + this.clientSecret +
          '&grant_type=authorization_code' +
          '&code=' + code;

      return request({
                uri : uri,
                method : 'POST',
                json: true,
                resolveWithFullResponse: true
              })
              .then(function (response) {
                  return response.body.access_token;
              })
              .catch(function (reason) {
                  return reason;
              });
  };

  this.revoke = function(session){

      var uri = this.apiUrl + '/oauth/revoke';
      var token = session.nylas_access_token;

      return request({
                uri : uri,
                method : 'POST',
                json: true,
                auth : {
                  user: token,
                  pass: ''
                },
                resolveWithFullResponse: true
              })
              .then(function (response) {
                  return response.status;
              })
              .catch(function (reason) {
                  return reason;
              });

  };
}

module.exports = NylasAuthStrategy;
