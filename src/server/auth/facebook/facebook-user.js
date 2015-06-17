'use strict'

function FacebookUser(){

  this.accessToken = ''; //token from google auth
  this.facebookUserId = '';
  this.user = null; //base user object
};

module.exports = FacebookUser;
