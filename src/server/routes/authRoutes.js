import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import RandomizerService from '../services/RandomizerService.js';

var router = express.Router();

router.get('/connect', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login'] }));


router.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (user === null) {
      res.redirect('/error');
    } else {
      res.redirect('/home');
    }
  })(req, res, next);
});

module.exports = router;
