'use strict';

import express from 'express';
import passport from 'passport';

var router = express.Router();

//callback route after successful google authentication
//note no redirects can happen on post
router.post('/signup', passport.authenticate('local-signup', {

        session: true

    }),function(req, res) {

        console.log('Signup created user in route : ' + JSON.stringify(req.user));
        req.logIn(req.user, function(err) {

          if (err) {
            req.session.messages = "Error";
            return res.json({ error: 'There was an error signing up'});
          }

          // set the message
          req.session.messages = 'Login successfully';
          console.log('In Signup - ' + JSON.stringify(req.user));
          return res.json(req.user);
        });

    }
  );

module.exports = router;
