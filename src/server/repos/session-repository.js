'use strict'

import query from 'pg-query';
import RandomizerService from '../services/randomizer-service.js';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;


  this.createSession = function(userId, emailAddress, auth_provider_token, auth_provider_name, auth_provider_user_id) {

    //generate
    var randomizer = new RandomizerService();
    var base_access_token = randomizer.getRandomUUIDv4();

    var sql = 'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, auth_provider_access_token, auth_provider_name, auth_provider_user_id) ' +
              'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; ';

    return query(sql, [userId, emailAddress, base_access_token, auth_provider_token, auth_provider_name, auth_provider_user_id])
            .then(function(result){

                if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                  return result[1].rows[0];
                } else{
                  throw new Error('There was an error creating your session');
                }
            });
  };

  this.getSession = function(base_access_token){

    var sql = 'SELECT * FROM sessions WHERE base_access_token = $1';
    return query(sql, [base_access_token])
            .then(function(result){
                if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                  return result[1].rows[0];
                } else{
                  throw new Error('There was an error getting the session');
                }
            });

  };

  this.deleteSession = function(base_access_token){

    var sql = 'DELETE FROM sessions WHERE base_access_token = $1';

    return query(sql, [base_access_token])
            .then(function(result){

                if(result && result[1] && result[1].rowCount == 1){
                  return result[1].rowCount;
                } else{
                  throw new Error('There was an error revoking the session');
                }
            });

  }


}

module.exports = SessionRepository;
