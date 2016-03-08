'use strict'

import query from 'pg-query';
import mapper from './pg-data-mapper.js';
import validator from 'validator';

function PasswordCrypto () {

  query.connectionParameters = Config.connectionString;

  //this will Insert a user and return the new row or return an existing row based on the provider id
  this.hashPassword = function(){


  };

  this.verifyPassword = function(){


  };


}

module.exports = PasswordCrypto;
