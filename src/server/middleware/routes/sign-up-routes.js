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
    },
        function(req, res, err) {

            if(!err){
              req.logIn(req.user, function(err) {

                if (err) {
                  req.session.messages = "Error";
                  return res.redirect('/error');
                }
                // set the message
                req.session.messages = 'Login successfully';
                return res.redirect('/user-home');
              });
            } else {
              //return back to sign up page
              return res.redirect('/error');
            }
        })
);

module.exports = router;
