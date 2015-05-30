import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import RandomizerService from '../services/RandomizerService.js';

var router = express.Router();


router.get('/connect', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate(
                                'google',
                                { successRedirect: '/home', failureRedirect: '/login' }
                            ));


module.exports = router;
