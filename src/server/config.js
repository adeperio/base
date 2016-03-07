'use strict'

var path = require('path');

(function () {

  //For some reason accessing process.env.NODE_ENV is not matching up the actual JSON object returned by JSON.stringify(env)
  //So we are doing this wierd loop through the JSON object properties and gettign the NODE_ENV that way
  //Need to investigate this further
  var nodeEnv = process.env;
  for (var key in process.env) {
    if (process.env.hasOwnProperty(key) && key == 'NODE_ENV') {

      nodeEnv = process.env[key];
    }
  }
  console.log('Config.js - process.env.NODE_ENV: ' + JSON.stringify(nodeEnv));


  require('dotenv').config({ path: nodeEnv + '.env'});
}());

module.exports = function(){
  return {
    connectionString: process.env.CONN_STRING,
    port: 3000,
    tls: {
      key: process.env.TLS_KEY,
      cert: process.env.TLS_CERT,
      ca: process.env.TLS_CA
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
