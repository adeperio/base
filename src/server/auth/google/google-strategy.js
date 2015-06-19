'use strict'

import passport from 'passport';
import passportGoogleOauth2 from 'passport-google-oauth2';

import GoogleUser from './google-user.js';
import UserRepository from '../../repos/user-repository.js';
import ProviderLookup from '../../auth/provider-lookup.js';

var GoogleStrategy = passportGoogleOauth2.Strategy;

module.exports = new GoogleStrategy({
  clientID:     Config.auth.google.clientID,
  clientSecret: Config.auth.google.clientSecret,
  callbackURL:  Config.auth.google.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    var userRepo = new UserRepository();
    userRepo.createUser(ProviderLookup.Google, profile.id)
    .then(function(user){
        if(user){

          // var googleUser = new GoogleUser();
          // googleUser.user = user;
          // googleUser.accessToken = accessToken;
          // googleUser.googleUserId = profile.id;

          done(null, user);
        }else{
          done(null, null);
        }

    }).catch(function(err){
        done(err, null);
    });
  }
);
