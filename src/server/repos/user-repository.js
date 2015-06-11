'use strict'

import query from 'pg-query';
import mapper from './pg-data-mapper.js';

function UserRepository () {

  query.connectionParameters = Config.connectionString;

  this.getUser = function(authProviderName, providerUserId) {

    var sql = 'SELECT users.* FROM users, auth_providers_lookup ' +
                'WHERE auth_providers_lookup.name = $1 AND users.auth_provider_user_id LIKE $2';

    var paramsArray = [authProviderName, providerUserId];
    return query(sql, paramsArray)
              .then(function(result){
                  if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                    return result[1].rows[0];
                  } else {
                    return null;
                  }
              })
              .then(function(userRow){
                  if(userRow){
                    return mapper.mapToUserAsync(userRow);
                  } else{
                    return null;
                  }

              });
  };

  //this will Insert a user and return the new row or return an existing row based on the provider id
  this.createUser = function(authProviderName, providerUserId){

      var sql = 'with d as ( ' +
                '    select id FROM auth_providers_lookup ' +
                '    where "name" = $1' +
                '), s as ( ' +
                '    select users.* ' +
                '    from users, auth_providers_lookup ' +
                '    where "name" = $2 and auth_provider_user_id = $3 ' +
                '), i as ( ' +
                '    insert into users (auth_provider_lookup_id_fkey, auth_provider_user_id) ' +
                '    select id, $4 from d  ' +
                '    where not exists (select 1 from s) ' +
                '    returning users.* ' +
                ') ' +
                'select i.* from i union all select s.* from s;';

      return query(sql, [authProviderName, authProviderName, providerUserId, providerUserId])
                .then(function(result){

                    if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                      return result[1].rows[0];
                    } else {
                      throw new Error('There was a problem creating the user');
                    }
                })
                .then(function(userRow){
                  if(userRow){
                    return mapper.mapToUserAsync(userRow);
                  } else{
                    return null;
                  }
                });
  };

  this.updateUser = function(emailAddress, firstName, lastName, authProviderName, providerUserId){


    var sql = 'UPDATE users AS a SET email_address = $1, first_name = $2, last_name = $3 ' +
              'FROM auth_providers_lookup AS b ' +
              'WHERE b.name = $4 ' +
              'AND a.auth_provider_user_id LIKE $5 ' +
              'AND a.auth_provider_lookup_id_fkey = b.id ' +
              'RETURNING *; ';

    return query(sql, [emailAddress, firstName, lastName, authProviderName, providerUserId])
            .then(function(result){

                if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                  return result[1].rows[0];
                } else {
                  throw new Error('There was a problem updating the user');
                }
            })
            .then(function(userRow){
              if(userRow){
                return mapper.mapToUserAsync(userRow);
              } else{
                return null;
              }
            });
  };



}

module.exports = UserRepository;
