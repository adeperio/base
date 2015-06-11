'use strict'

import User from '../models/user.js';

//This module takes in postgres database rows and results and maps them to domain models
function Mapper(){

  //will map postgres results to an array of user objects
  this.mapToUsers = function(rows){




  };

  //will map a single user row to a user object
  this.mapToUser = function(userRow){

    var user = new User();
    user.emailAddress = userRow.email_address;
    user.firstName = userRow.first_name;
    user.lastName = userRow.last_name;
    user.bio = userRow.bio;
    return user;

  }
}

module.exports = Mapper;
