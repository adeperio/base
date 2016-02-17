'use strict'

import passport from 'passport';
import googleStrategy from './google/google-strategy.js';
import facebookStrategy from './facebook/facebook-strategy.js';
import localSignInStrategy from './local/local-sign-in-strategy.js';
import localSignUpStrategy from './local/local-sign-up-strategy.js';

//auth strategies
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use('local-signin', localSignInStrategy);
passport.use('local-signup', localSignUpStrategy);

//serialising and deserialising user objects
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
