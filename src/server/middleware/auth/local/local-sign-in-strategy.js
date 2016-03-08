'use strict'
import passport from 'passport';
import passportLocal from 'passport-local';
import UserRepository from '../../../repos/user-repository.js';
import PasswordCrypto from '../../../crypto/password-crypto.js';

var LocalStrategy = passportLocal.Strategy;

module.exports = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'emailAddress',
        passwordField : 'password',
        passReqToCallback : false // allows us to pass back the entire request to the callback

    }, function(emailAddress, password, done) {

        var userRepo = new UserRepository();
        var passwordCrypto = new PasswordCrypto();

        userRepo.getUserForEmail(emailAddress)
            .then(function(user){
                if(user){
                  var storedHashedPassword = user.password;

                  passwordCrypto.verifyPassword(password, storedHashedPassword, function(err, isVerified) {
                        console.log('PASSWORD');
                        if(!err && isVerified){
                          done(null, user);
                        } else {
                          done(null, false, { message: 'Incorrect password.' });
                        }
                  });


                }else{
                  //error
                  done(null, false, { message: 'Incorrect username.' });
                }
            });
});
