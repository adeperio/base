'use strict'

import query from 'pg-query';

function UserRepository () {

  query.connectionParameters = Config.connectionString;

  this.createUser = function(account) {

    var sql = 'insert into users (email_address)' +
          'select ' +
              '\'' + account.email_address + '\'' +
          'where not exists (' +
              'select * from users where email_address = \'' + account.email_address + '\')';

    return query(sql).then(function(result){
                  return account;
              });
  };
}

module.exports = UserRepository;
