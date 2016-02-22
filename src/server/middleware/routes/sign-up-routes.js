'use strict';

import express from 'express';
import passport from 'passport';

var router = express.Router();

//callback route after successful google authentication
router.post('/signup', passport.authenticate('local-signup', {

        session: true,
        successRedirect : '/user-home', // redirect to the secure profile section
        failureRedirect : '/error', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages

    }));

module.exports = router;
