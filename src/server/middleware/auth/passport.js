'use strict'

import passport from 'passport';
import googleStrategy from './google/google-strategy.js';
import facebookStrategy from './facebook/facebook-strategy.js';

//auth strategies
passport.use(googleStrategy);
passport.use(facebookStrategy);

//serialising and deserialising user objects
passport.serializeUser(function(user, done) {
  // console.log('serializeUser ' + JSON.stringify(user));
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log('deserializeUser ' + JSON.stringify(user));
  done(null, user);
});

module.exports = passport;
