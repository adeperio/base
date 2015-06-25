'use strict'

var path = require('path');

(function () {

  require('dotenv').config();

}());

module.exports = function(){
  return {
    connectionString: process.env.NODE_ENV === 'test' ? process.env.CONN_STRING_TEST_DB : process.env.CONN_STRING,
    tls: {
      key: process.env.TLS_KEY,
      cert: process.env.TLS_CERT
    },
    auth: {
      google: {
        clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.AUTH_GOOGLE_CALLBACK_URL
      },
      facebook: {
        clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.AUTH_FACEBOOK_CALLBACK_URL
      }
    },
    session: {
      timeToLiveInMilliseconds:process.env.SESSION_TTL,
      secret: process.env.SESSION_SECRET
    }
  };

};
