'use strict'

import passport from 'passport';
import passportGoogleOauth2 from 'passport-google-oauth2';
import UserRepository from './repos/store/UserRepository.js';
import ProviderLookup from './repos/store/ProviderLookup.js';
var GoogleStrategy = passportGoogleOauth2.Strategy;


passport.use(new GoogleStrategy({
  clientID:     Config.auth.clientID,
  clientSecret: Config.auth.clientSecret,
  callbackURL:  Config.auth.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    var userRepo = new UserRepository();
    userRepo.createUser(ProviderLookup.Google, profile.id, function (err, users) {
      if(users.length > 0 && users.email_address != null){
        return done(err, users);
      } else{
        return done(err, {});
      }

    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
