'use strict'

import passport from 'passport';
import PassportFacebook from 'passport-facebook';
var FacebookStrategy = PassportFacebook.Strategy;

import FacebookUser from './facebook-user.js';
import UserRepository from '../../repos/user-repository.js';
import ProviderLookup from '../../auth/provider-lookup.js';

module.exports = new FacebookStrategy({
    clientID:     Config.auth.facebook.clientID,
    clientSecret: Config.auth.facebook.clientSecret,
    callbackURL:  Config.auth.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var userRepo = new UserRepository();
    userRepo.createUser(ProviderLookup.Facebook, profile.id)
    .then(function(user){
        if(user){

          var facebookUser = new FacebookUser();
          facebookUser.user = user;
          facebookUser.accessToken = accessToken;
          facebookUser.facebookUserId = profile.id;

          done(null, facebookUser);
        }else{
          done(null, null);
        }

    }).catch(function(err){
        done(err, null);
    });
  }
);
