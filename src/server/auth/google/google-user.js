'use strict'

function GoogleUser(){

  this.access_token = ''; //token from google auth
  this.googleUserId = '';
  this.user = null; //base user object

};

module.exports = GoogleUser;
