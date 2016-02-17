'use strict';

import express from 'express';
import passport from 'passport';

var router = express.Router();

//callback route after successful google authentication
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/user-home', // redirect to the secure profile section
        failureRedirect : '/sign-up', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    },

        function(req, res) {
            console.log('Req: ' + JSON.stringify(req));
            console.log('Res: ' + JSON.stringify(res));

            req.logIn(req.user, function(err) {

              if (err) {
                req.session.messages = "Error";
                return res.redirect('/error');
              }

              // set the message
              req.session.messages = 'Login successfully';
              return res.redirect('/user-home');
            });

        })
);

module.exports = router;
