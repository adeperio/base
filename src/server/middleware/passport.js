'use strict'

import passport from 'passport';
import googleStrategy from '../auth/google/google-strategy.js';
import bearerStrategy from '../auth/bearer/bearer-strategy.js';

//auth strategies
passport.use(googleStrategy);
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

//token strategy
passport.use(bearerStrategy);

module.exports = passport;
