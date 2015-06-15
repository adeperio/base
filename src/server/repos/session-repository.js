'use strict'

import query from 'pg-query';
import RandomizerService from '../services/randomizer-service.js';
import validator from 'validator';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;

  this.createSession = function(userId, emailAddress, authProviderToken, authProviderName, authProviderUserId) {

    //generate
    var randomizer = new RandomizerService();
    var baseAccessToken = randomizer.getRandomUUIDv4();

    var sql = 'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, auth_provider_access_token, auth_provider_name, auth_provider_user_id) ' +
              'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; ';

    if(!validator.isEmail(emailAddress) && !validator.isNull(emailAddress)){
      throw new Error('This is not a valid email address');
    } else {
      return query(sql, [userId, emailAddress, baseAccessToken, authProviderToken, authProviderName, authProviderUserId])
              .then(function(result){

                  if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                    return result[1].rows[0];
                  } else{
                    throw new Error('There was an error creating your session');
                  }
              });
    }

  };

  this.getSession = function(baseAccessToken){

    var sql = 'SELECT * FROM sessions WHERE base_access_token = $1';
    return query(sql, [baseAccessToken])
            .then(function(result){
                if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                  return result[1].rows[0];
                } else{
                  throw new Error('There was an error getting the session');
                }
            });

  };

  this.deleteSession = function(baseAccessToken){

    var sql = 'DELETE FROM sessions WHERE base_access_token = $1';

    return query(sql, [baseAccessToken])
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
