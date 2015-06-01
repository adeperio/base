'use strict'

module.exports = function(){
  return {
      connectionString: 'postgres://postgres:postgres@localhost:5432/base',
      auth: {
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://basestackjs.com/google/callback'
      }
  };
};
