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

        var googleUser = req.user;
        
        var sessionRepo = new SessionRepository();
        sessionRepo.createSession(googleUser, googleUser.providerToken, ProviderLookup.Google, googleUser.auth_provider_user_id)
          .then(function(session){

            //This call back will render the index page on the callback route.
            //View the app.js file for the route mapping for /google/callback.
            res.render('index', {
                                    access_token: session.base_access_token,
                                    email_address: session.email_address
                                });
          }).catch(function(e){
            res.redirect('/error');
          });
    }
);


module.exports = router;
