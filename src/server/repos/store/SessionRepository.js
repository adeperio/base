'use strict'

import query from 'pg-query';
import RandomizerService from '../../services/RandomizerService.js';

function SessionRepository () {

  query.connectionParameters = Config.connectionString;

  this.createSession = function(user, provider_token) {

    //generate
    var randomizer = new RandomizerService();
    var base_access_token = randomizer.getRandomUUIDv4();

    var sql = 'INSERT INTO sessions (user_id_fkey, email_address, base_access_token, auth_provider_access_token) ' +
              'VALUES ($1, $2, $3, $4) RETURNING *; ';

    var params = [user.id, '', base_access_token, provider_token];
    console.log('PARAMS ' + JSON.stringify(params) + '\n');
    console.log('USER ' + JSON.stringify(user) + '\n');
    return query(sql, params)
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
