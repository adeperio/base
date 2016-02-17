
import passport from 'passport';
import passportLocal from 'passport-local';

var LocalStrategy = passportLocal.Strategy;

//** LocalStrategy to handle Sign Ups and Registrations

module.exports = new LocalStrategy({

        // by default, local strategy uses username and password, we will override with email
        usernameField : 'emailAddress',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback

    },function(req, emailAddress, password, done) {

      console.log('User signed up successfully');

        var userRepo = new UserRepository();

        //TODO: Hash password here

        userRepo.createUser(emailAddress, password)
            .then(function(createdNewUser){
                if(createdNewUser){
                  //if a new user was successfully created...

                  done(null, createdNewUser);
                }else{

                  done(null, false, { message: 'Incorrect username.' })
                }

            }).catch(function(err){
                return done(err);
            });
  }
);
