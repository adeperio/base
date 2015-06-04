'use strict'

import query from 'pg-query';

function UserRepository () {

  query.connectionParameters = Config.connectionString;

  this.getUser = function(auth_provider_name, provider_user_id) {

    var sql = 'SELECT * FROM users INNER JOIN auth_providers_lookup ' +
              'ON users.auth_provider_lookup_id_fkey = auth_providers_lookup.id ' +
              'WHERE auth_providers_lookup.name = \'' + auth_provider_name + '\' AND users.auth_provider_user_id LIKE \''+ provider_user_id + '\'';

    return query(sql)
              .then(function(result){
                  if(result && result.rows){
                    return result.rows;
                  } else{
                    return [];
                  }
              });
  }

}

module.exports = UserRepository;
