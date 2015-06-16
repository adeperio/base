'use strict'

import _ from 'lodash';
import Promise from 'bluebird';
import User from '../models/user.js';
import Session from '../models/session.js';

//This module takes in postgres database rows and results and maps them to domain models
//Note: This is promisified
function Mapper(){

  //will map postgres results to an array of user objects
  this.mapToUsers = function(userRows, cb){

    var users = _.each(userRows, function(userRow){
                    return userRow;
                  });

    cb(null, users);

  };

  //will map a single user row to a user object
  this.mapToUser = function(userRow, cb){

    var user = new User();
    user._id = userRow.id;
    user.emailAddress = userRow.email_address;
    user.firstName = userRow.first_name;
    user.lastName = userRow.last_name;
    user.bio = userRow.bio;
    user.created = userRow.created;

    cb(null, user);

  };

  this.mapToSessions = function(sessionRows, cb){

    var sessions = _.each(sessionRows, function(sessionRow){
                    return sessionRow;
                  });

    cb(null, sessions);

  };

  this.mapToSession = function(sessionRow, cb){
    var session = new Session();

    session.user._id = sessionRow.user_id_fkey;
    session.user.emailAddress = sessionRow.email_address;

    session.baseToken = sessionRow.base_access_token;
    session.providerToken = sessionRow.auth_provider_access_token;
    session.providerName = sessionRow.auth_provider_name;
    session.providerUserId = sessionRow.auth_provider_user_id;
    session.expiry = sessionRow.expiry;
    session.created = sessionRow.created;


    cb(null, session);
  }
}

var mapper = new Mapper();
module.exports = Promise.promisifyAll(mapper);
