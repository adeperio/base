'use strict'

import passport from 'passport';
import passportGoogleOauth2 from 'passport-google-oauth2';
var GoogleStrategy = passportGoogleOauth2.Strategy;

passport.use(new GoogleStrategy({
  clientID:     Config.auth.clientID,
  clientSecret: Config.auth.clientSecret,
  callbackURL:  Config.auth.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    var user = {};
    done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
