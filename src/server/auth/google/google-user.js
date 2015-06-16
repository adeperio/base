'use strict'

function GoogleUser(){

  this.accessToken = ''; //token from google auth
  this.googleUserId = '';
  this.user = null; //base user object
};

module.exports = GoogleUser;
