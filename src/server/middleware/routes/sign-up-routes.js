'use strict';

import express from 'express';
import passport from 'passport';

var router = express.Router();

//callback route after successful google authentication
//note no redirects can happen on post
router.post('/signup', passport.authenticate('local-signup', {
        session: true
    }),function(req, res) {

        req.logIn(req.user, function(err) {

          if (err) {
            req.session.messages = "Error";
            return res.json({ error: 'There was an error signing up'});
          }

          // set the message
          req.session.messages = 'Signed up successfully';
          return res.json(req.user);
        });

    }
  );

module.exports = router;
