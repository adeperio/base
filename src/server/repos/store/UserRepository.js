'use strict'

import query from 'pg-query';

function UserRepository () {

  query.connectionParameters = Config.connectionString;

  this.createUser = function(email_address) {

    var sql = 'insert into users (email_address)' +
          'select ' +
              '\'' + account.email_address + '\'' +
          'where not exists (' +
              'select * from users where email_address = \'' + account.email_address + '\')';

    return query(sql)
              .then(function(result){
                  return account;
              });
  };

  this.getUser = function(auth_provider_id){

  }

}

module.exports = UserRepository;
