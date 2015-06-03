'use strict'

import query from 'pg-query';
import RandomizerService from '../../services/RandomizerService.js';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;

  this.createSession = function(auth_provider_access_token) {

    //generate
    var randomizer = new RandomizerService();
    var base_access_token = randomizer.getRandomUUIDv4();

    // var userRepo = new UserRepository();
    // return userRepo.createUser(account)
    //       .then(function(user){
    //
    //           var sql = 'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, auth_provider_access_token) ' +
    //           'SELECT users.id, users.email_address, $1, $2, $3 ' +
    //           'FROM users ' +
    //           'WHERE users.email_address LIKE $4';
    //
    //           return query(sql, [user base_access_token, auth_provider_access_token, account.namespace_id, account.email_address]);
    //       })
    //       .then(function(result){
    //           return harness_access_token;
    //       });
  };


}

module.exports = SessionRepository;
