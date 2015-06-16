'use strict'

import query from 'pg-query';
import RandomizerService from '../services/randomizer-service.js';
import validator from 'validator';
import mapper from './pg-data-mapper.js';
import moment from 'moment';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;

  this.createSession = function(userId, emailAddress, authProviderToken, authProviderName, authProviderUserId) {

    var randomizer = new RandomizerService();
    var baseAccessToken = randomizer.getRandomUUIDv4();

    var created = new Date();
    var expiry = new Date(moment(created).add(Config.token.timeToLiveInMilliseconds, 'ms'));

    var sql = 'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, auth_provider_access_token, auth_provider_name, auth_provider_user_id, created, expiry) ' +
              'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *; ';

    if(!validator.isEmail(emailAddress) && !validator.isNull(emailAddress)){
      throw new Error('This is not a valid email address');
    } else {
      return query(sql, [userId, emailAddress, baseAccessToken, authProviderToken, authProviderName, authProviderUserId, created, expiry])
              .then(function(result){

                  if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                    return result[1].rows[0];
                  } else{
                    throw new Error('There was an error creating your session');
                  }
              })
              .then(function(sessionRow){

                if(sessionRow){
                  return mapper.mapToSessionAsync(sessionRow);
                } else{
                  return null;
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
            })
            .then(function(sessionRow){

              if(sessionRow){
                return mapper.mapToSessionAsync(sessionRow);
              } else{
                return null;
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
