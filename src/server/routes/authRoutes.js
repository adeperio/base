import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import RandomizerService from '../services/RandomizerService.js';

var router = express.Router();


router.get('/connect', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }));

router.get('/google/callback', passport.authenticate('google',
                                {
                                  successRedirect: '/home',
                                  failureRedirect: '/login'
                                }
                            ));


module.exports = router;
