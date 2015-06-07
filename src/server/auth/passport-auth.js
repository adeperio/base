'use strict'

import passport from 'passport';
var BearerStrategy = require('passport-http-bearer').Strategy;
import passportGoogleOauth2 from 'passport-google-oauth2';
import UserRepository from '../repos/store/UserRepository.js';
import ProviderLookup from '../repos/store/ProviderLookup.js';
var GoogleStrategy = passportGoogleOauth2.Strategy;

passport.use(new GoogleStrategy({
  clientID:     Config.auth.clientID,
  clientSecret: Config.auth.clientSecret,
  callbackURL:  Config.auth.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    var userRepo = new UserRepository();
    userRepo.createUser(ProviderLookup.Google, profile.id)
    .then(function(users){
        if(users.length == 1){
          var user = users[0];
          user.providerToken = accessToken;
          done(null, user);
        }else{
          done(null, null);
        }

    }).catch(function(err){
        done(err, null);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


//token auth setup
passport.use(
    new BearerStrategy(
        function(token, done) {
            // User.findOne({ access_token: token },
            //     function(err, user) {
            //         if(err) {
            //             return done(err)
            //         }
            //         if(!user) {
            //             return done(null, false)
            //         }
            //
            //         return done(null, user, { scope: 'all' })
            //     }
            // );
        }
    )
);

module.exports = passport;
