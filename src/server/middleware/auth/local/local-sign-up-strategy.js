'use strict'
import passport from 'passport';
import passportLocal from 'passport-local';
import UserRepository from '../../../repos/user-repository.js';
import PasswordCrypto from '../../../crypto/password-crypto.js';
var LocalStrategy = passportLocal.Strategy;

//** LocalStrategy to handle Sign Ups and Registrations
module.exports = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'emailAddress',
        passwordField : 'password',
        passReqToCallback : false
    },
    function(emailAddress, password, done) {

          var userRepo = new UserRepository();
          var passwordCrypto = new PasswordCrypto();
          passwordCrypto.hashPassword(password, function(err, hashedPwd) {

            if(!err && hashedPwd){

              userRepo.createUser(emailAddress, hashedPwd)
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
            } else{

              done(err);
            }

          });


        }
);
