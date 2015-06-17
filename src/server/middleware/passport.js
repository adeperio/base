'use strict'

import passport from 'passport';
import googleStrategy from '../auth/google/google-strategy.js';
import facebookStrategy from '../auth/facebook/facebook-strategy.js';
import bearerStrategy from '../auth/bearer/bearer-strategy.js';

//auth strategies
passport.use(googleStrategy);
passport.use(facebookStrategy);

//token strategy
passport.use(bearerStrategy);

//serialising and deserialising user objects
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

module.exports = passport;
