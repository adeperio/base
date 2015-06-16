'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/user-repository.js';
import SessionRepository from '../repos/session-repository.js';
var router = express.Router();

router.get('/me', passport.authenticate('bearer', { session: false }), function(req, res) {

  var session = req.user; //session object, supplied by Bearer strategy

  var userRepo = new UserRepository();
  userRepo.getUser(session.providerName, session.providerUserId)
            .then(function(user){
              res.json(user);
            }).catch(function(err){
              res.redirect('/error');
            });

});

module.exports = router;
