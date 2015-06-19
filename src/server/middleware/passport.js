'use strict'

import passport from 'passport';
import googleStrategy from '../auth/google/google-strategy.js';
import facebookStrategy from '../auth/facebook/facebook-strategy.js';
import bearerStrategy from '../auth/bearer/bearer-strategy.js';

//auth strategies
passport.use(googleStrategy);
passport.use(facebookStrategy);

//token strategy

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
