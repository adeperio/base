'use strict'

import passport from 'passport';
import passportGoogleOauth2 from 'passport-google-oauth2';

import UserRepository from '../../repos/store/UserRepository.js';
import ProviderLookup from '../../repos/store/ProviderLookup.js';

var GoogleStrategy = passportGoogleOauth2.Strategy;

module.exports = new GoogleStrategy({
  clientID:     Config.auth.clientID,
  clientSecret: Config.auth.clientSecret,
  callbackURL:  Config.auth.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    //if attempting to signup we create a user record for them if a user doesn't exist using the provider id as an identifier
    //this user gets a very limited scope
    //when the session associated with this expires or is revoke we should delete this user
    //WIP move this code into the sign in routes logic
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
);
