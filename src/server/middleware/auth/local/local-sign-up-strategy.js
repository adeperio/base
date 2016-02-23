'use strict'
import passport from 'passport';
import passportLocal from 'passport-local';
import UserRepository from '../../../repos/user-repository.js';
var LocalStrategy = passportLocal.Strategy;

//** LocalStrategy to handle Sign Ups and Registrations
module.exports = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'emailAddress',
        passwordField : 'password'
    },
    function(emailAddress, password, done) {

          var userRepo = new UserRepository();

          userRepo.createUser(emailAddress, password)
                      .then(function(createdNewUser) {
                              if(createdNewUser) {
                                  return done(null, createdNewUser);
                              } else {
                                  done(new Error('Could not sign up user'), false);
                              }
                            },
                            function(err)
                            {
                                done(err);
                            }
                      );
        }
);
