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

    var emailAddress = profile.emails[0].value;
    var firstName = profile.name.familyName;
    var lastName = profile.name.givenName;

    var userRepo = new UserRepository();
    userRepo.createUser(emailAddress, firstName, lastName, ProviderLookup.Facebook, profile.id)
    .then(function(user){
        if(user){
          done(null, user);
        }else{
          done(null, null);
        }

    }).catch(function(err){
        done(err, null);
    });
  }
);
