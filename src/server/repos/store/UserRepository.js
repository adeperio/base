'use strict'

import query from 'pg-query';

function UserRepository () {

  query.connectionParameters = Config.connectionString;

  //this will Insert a user and return the new row or return an existing row based on the provider id
  this.createUser = function(auth_provider_name, provider_user_id){

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

      return query(sql, [auth_provider_name, auth_provider_name, provider_user_id, provider_user_id])
              .then(function(result){
                  if(result && result[1] && result[1].rows){
                    return result[1].rows;
                  } else{
                    return [];
                  }
              });
  };

  this.updateUser = function(emailAddress, firstName, lastName, auth_provider_name, provider_user_id){

    var sql = 'UPDATE users SET email_address = $1, first_name = $2, last_name = $3 ' +
              'WHERE exists (SELECT 1 FROM users, auth_providers_lookup WHERE "name" = $4 AND auth_provider_user_id = $5) ' +
              'RETURNING *; ';

    return query(sql, [emailAddress, firstName, lastName, auth_provider_name, provider_user_id])
            .then(function(result){
                if(result && result[1] && result[1].rows){
                  return result[1].rows;
                } else{
                  return [];
                }
            });

  };

  this.getUser = function(auth_provider_name, provider_user_id) {

    var sql = 'SELECT users.* FROM users, auth_providers_lookup ' +
                'WHERE auth_providers_lookup.name = $1 AND users.auth_provider_user_id LIKE $2';

    var paramsArray = [auth_provider_name, provider_user_id];
    return query(sql, paramsArray)
              .then(function(result){

                  if(result && result[1] && result[1].rows){
                    return result[1].rows;
                  } else{
                    return [ ];
                  }
              });
  };

}

module.exports = UserRepository;
