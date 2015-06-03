'use strict'

import passport from 'passport';
import passportGoogleOauth2 from 'passport-google-oauth2';
import UserRepository from './repos/store/UserRepository.js';
var GoogleStrategy = passportGoogleOauth2.Strategy;


passport.use(new GoogleStrategy({
  clientID:     Config.auth.clientID,
  clientSecret: Config.auth.clientSecret,
  callbackURL:  Config.auth.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    var userRepo = new UserRepository();
    console.log('PROFILE ' + JSON.stringify(profile));
    return done(null, profile);
    // userRepo.createUser({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });


  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
