'use strict'

import passport from 'passport';
import GoogleStrategy from '../auth/google/GoogleStrategy.js';
var BearerStrategy = require('passport-http-bearer').Strategy;

import SessionRepository from '../repos/store/SessionRepository.js';

passport.use(GoogleStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//token auth setup
passport.use(new BearerStrategy(
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
    )
);

module.exports = passport;
