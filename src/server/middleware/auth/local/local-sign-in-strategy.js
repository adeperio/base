'use strict'
import passport from 'passport';
import passportLocal from 'passport-local';
import UserRepository from '../../../repos/user-repository.js';

var LocalStrategy = passportLocal.Strategy;

module.exports = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'emailAddress',
        passwordField : 'password',
        passReqToCallback : false // allows us to pass back the entire request to the callback
    },function(emailAddress, password, done) {


        var userRepo = new UserRepository();
        userRepo.getUserForEmailAndPassword(emailAddress, password)
            .then(function(user){

                
                if(user){

                  //TODO: Validate password here

                  return done(null, user);
                }else{
                  //error
                  done(null, false, { message: 'Incorrect username.' });
                }
            });
});
