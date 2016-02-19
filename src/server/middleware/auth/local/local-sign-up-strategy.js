'use strict'
import passport from 'passport';
import passportLocal from 'passport-local';
import UserRepository from '../../../repos/user-repository.js';
var LocalStrategy = passportLocal.Strategy;

//** LocalStrategy to handle Sign Ups and Registrations

module.exports = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'emailAddress',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback

    },function(req, emailAddress, password, done) {

        var userRepo = new UserRepository();

        //TODO: Hash password here

        console.log('Creating new user...');
        userRepo.createUser(emailAddress, password)
            .then(function(createdNewUser){
                if(createdNewUser){
                  //if a new user was successfully created...
                  console.log('User signed up successfully');
                  done(null, createdNewUser);

                  return;
                }else{
                  console.log('User signed up UNSUCCESSFULLY');
                  done(null, false, { message: 'Incorrect username.' });
                  promise.break();
                  return;
                }
            }).catch(function(err){

                console.log('In Catch: User signed up UNSUCCESSFULLY: ' + JSON.stringify(err));
                return done(null, false, err)
            });
  }
);
