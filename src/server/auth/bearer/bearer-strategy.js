'use strict'

var BearerStrategy = require('passport-http-bearer').Strategy;
import SessionRepository from '../../repos/session-repository.js';

//This is where token validation is checked
module.exports = new BearerStrategy(
    function(token, done) {

        var sessionRepo = new SessionRepository();
        sessionRepo.getSession(token)
            .then(function(session){

              var ttlInMilliSeconds = session.timeToLiveInMilliseconds;
              var createdDate = session.created;




              if(!session && ) {
                  return done(null, false);
              }

              //WIP check for scopes
              return done(null, session, { scope: 'all' });

            }).catch(function(e){
              return done(e);
            });
    }
);
