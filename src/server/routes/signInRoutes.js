'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import SessionRepository from '../repos/store/SessionRepository.js';
import RandomizerService from '../services/RandomizerService.js';
import ProviderLookup from '../repos/store/ProviderLookup.js';

var router = express.Router();

router.get('/connect', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: "/error" }),
    function(req, res) {

        var sessionRepo = new SessionRepository();
        sessionRepo.createSession(req.user, req.user.providerToken, ProviderLookup.Google, )
          .then(function(session){
            res.render('index', {
                                    sessionToken: session.base_access_token,
                                    sessionEmail: session.email_address
                                });
          });
    }
);


module.exports = router;
