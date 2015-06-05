import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import SessionRepository from '../repos/store/SessionRepository.js';
import RandomizerService from '../services/RandomizerService.js';

var router = express.Router();

router.get('/connect', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login'] }));


router.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (user === null) {
      res.redirect('/error');
    } else {

      var sessionRepo = new SessionRepository();

      sessionRepo.createSession(user, info.providerToken)
        .then(function(){
          if (user.email_address === null) {
            res.redirect('/signup');
          } else{
            res.redirect('/home');
          }
        });

    }
  })(req, res, next);
});

module.exports = router;
