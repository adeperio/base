'use strict'

import passport from 'passport';
import PassportFacebook from 'passport-facebook';
var FacebookStrategy = PassportFacebook.Strategy;

import UserRepository from '../../repos/user-repository.js';
import ProviderLookup from '../../auth/provider-lookup.js';

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://www.example.com/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//
//     var userRepo = new UserRepository();
//     userRepo.createUser(ProviderLookup.Facebook, profile.id)
//     .then(function(user){
//         if(user){
//
//           var googleUser = new GoogleUser();
//           googleUser.user = user;
//           googleUser.accessToken = accessToken;
//           googleUser.googleUserId = profile.id;
//
//           done(null, googleUser);
//         }else{
//           done(null, null);
//         }
//
//     }).catch(function(err){
//         done(err, null);
//     });
//   }
// ));
