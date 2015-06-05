'use strict'

import query from 'pg-query';

function UserRepository () {

  query.connectionParameters = Config.connectionString;

  //this will Insert a user and return the new row or return an existing row
  this.createUser = function(auth_provider_name, provider_user_id){

      var sql = 'BEGIN; ' +
                'LOCK TABLE users IN SHARE ROW EXCLUSIVE MODE; ' +
                'with d as ( ' +
                '    select id FROM auth_providers_lookup ' +
                '    where "name" = \'' + auth_provider_name + '\' ' +
                '), s as ( ' +
                '    select users.* ' +
                '    from users, auth_providers_lookup ' +
                '    where "name" = \'' + auth_provider_name + '\' and auth_provider_user_id = \'' + provider_user_id + '\' ' +
                '), i as ( ' +
                '    insert into users (auth_provider_lookup_id_fkey, auth_provider_user_id) ' +
                '    select id, \'' + provider_user_id + '\' from d  ' +
                '    where not exists (select 1 from s) ' +
                '    returning users.* ' +
                ') ' +
                'select i.* from i union all select s.* from s;' +
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

  this.getUser = function(auth_provider_name, provider_user_id) {

      var sql = 'SELECT users.* FROM users, auth_providers_lookup ' +
                'WHERE auth_providers_lookup.name = \'' + auth_provider_name + '\' AND users.auth_provider_user_id LIKE \''+ provider_user_id + '\'';

    return query(sql)
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
