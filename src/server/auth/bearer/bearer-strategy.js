'use strict'

var BearerStrategy = require('passport-http-bearer').Strategy;
import SessionRepository from '../../repos/store/SessionRepository.js';

module.exports = new BearerStrategy(
    function(token, done) {

        var sessionRepo = new SessionRepository();
        sessionRepo.getSession(token)
            .then(function(session){
              if(!session) {
                  return done(null, false);
              }
              //WIP check for scopes
              return done(null, session, { scope: 'all' });

            }).catch(function(e){
              return done(e);
            });
    }
);
