'use strict'

import query from 'pg-query';
import RandomizerService from '../../services/RandomizerService.js';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;

  this.createSession = function(user, provider_token) {

    //generate
    var randomizer = new RandomizerService();
    var base_access_token = randomizer.getRandomUUIDv4();

    var sql = 'BEGIN; ' +
              'LOCK TABLE users IN SHARE ROW EXCLUSIVE MODE; ' +
              'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, auth_provider_access_token) ' +
              'VALUES (' + user.id + ', \'' + user.email_address + '\', \'' + base_access_token + '\', \'' + provider_token + '\') RETURNING *; ' +
              'COMMIT;';

    return query(sql)
            .then(function(result){
                if(result && result[1] && result[1].rows){
                  return result[1].rows;
                } else{
                  return [];
                }
            });
  };
}

module.exports = SessionRepository;
