'use strict'

import query from 'pg-query';
import UserRepository from './UserRepository.js';
import NylasEmailStrategy from '../../nylas/NylasEmailStrategy.js';
import RandomizerService from '../../services/RandomizerService.js';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;

  this.createSession = function(nylas_access_token) {

    //generate application base token
    var randomizer = new RandomizerService();
    var base_access_token = randomizer.getRandomUUIDv4();

    var session = {
      nylas_access_token : nylas_access_token
    };

    var userRepo = new UserRepository();
    return userRepo.createUser(account)
                .then(function(account){

                    var sql = 'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, nylas_access_token, nylas_namespace) ' +
                    'SELECT users.id, users.email_address, \'' + base_access_token + '\', \'' + nylas_access_token + '\', \'' + account.namespace_id + '\' ' +
                    'FROM users ' +
                    'WHERE users.email_address LIKE \'' + account.email_address + '\'';

                    return query(sql);
                })
                .then(function(result){
                    return base_access_token;
                });
  };

  this.getSession = function(base_access_token) {

    var sql = 'SELECT email_address, base_access_token, nylas_access_token, nylas_namespace FROM sessions WHERE base_access_token LIKE \'' + base_access_token + '\'';
    return query(sql).then(function(result){
                  var firstRow = result[0][0];

                  if(firstRow){
                    return {
                      email_address : firstRow['email_address'],
                      base_access_token : firstRow['base_access_token'],
                      nylas_access_token : firstRow['nylas_access_token'],
                      nylas_namespace : firstRow['nylas_namespace']
                    };
                  }

                  return null;

              });
  };

  this.deleteSession = function(base_access_token){

    var sql = 'DELETE FROM sessions WHERE base_access_token LIKE \'' + base_access_token + '\'';
    return query(sql);

  }
}

module.exports = SessionRepository;
