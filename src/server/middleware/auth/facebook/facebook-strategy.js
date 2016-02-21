'use strict'

import passport from 'passport';
import PassportFacebook from 'passport-facebook';
var FacebookStrategy = PassportFacebook.Strategy;

import FacebookUser from './facebook-user.js';
import ProviderLookup from '../provider-lookup.js';
import UserRepository from '../../../repos/user-repository.js';


module.exports = new FacebookStrategy({
    clientID:     Config.auth.facebook.clientID,
    clientSecret: Config.auth.facebook.clientSecret,
    callbackURL:  Config.auth.facebook.callbackURL,
    profileFields: ['id', 'name', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

    var emailAddress = profile.emails[0].value;
    var firstName = profile.name.givenName;
    var lastName = profile.name.familyName;

    var userRepo = new UserRepository();
    userRepo.createOrRetrieveUser(emailAddress, firstName, lastName, ProviderLookup.Facebook, profile.id)
    .then(function(user){
        if(user){

          return done(null, user);
        }else{
          return done(null, null);
        }

    }).catch(function(err){
        return done(err, null);
    });
  }
);
