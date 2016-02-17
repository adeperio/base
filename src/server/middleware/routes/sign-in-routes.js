'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../../repos/user-repository.js';
import RandomizerService from '../../services/randomizer-service.js';
import ProviderLookup from '../auth/provider-lookup.js';

var router = express.Router();

router.post('/connect/local', passport.authenticate('local-signin', {
        session: true,
        successRedirect : '/user-home', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the sign in page if there is an error
        failureFlash : false // allow flash messages
    }));

//The authentication url for google
router.get('/connect/google', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'] }));


//callback route after successful google authentication
router.get('/google/callback', passport.authenticate('google', { session: true, failureRedirect: "/error" }),

    function(req, res) {

        req.logIn(req.user, function(err) {

          if (err) {
            req.session.messages = "Error";
            return res.redirect('/error');
          }

          // set the message
          req.session.messages = 'Login successfully';
          return res.redirect('/user-home');
        });

    }
);

//The authentication url for FB
router.get('/connect/facebook', passport.authenticate('facebook', { scope : ['email', 'public_profile']}));

//callback route after successful google authentication
router.get('/facebook/callback', passport.authenticate('facebook', { session: true, failureRedirect: "/error" }),

    function(req, res) {

        req.logIn(req.user, function(err) {

          if (err) {
            req.session.messages = "Error";
            return res.redirect('/error');
          }

          // set the message
          req.session.messages = 'Login successfully';
          return res.redirect('/user-home');
        });
 
    }
);




module.exports = router;
