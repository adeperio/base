'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import SessionRepository from '../repos/store/SessionRepository.js';
var router = express.Router();

router.get( '/me', passport.authenticate('bearer', { session: false }), function(req, res) {

  var session = req.user; //session object, supplied by Bearer strategy

  var userRepo = new UserRepository();
  userRepo.getUser(session.auth_provider_name, session.auth_provider_user_id)
            .then(function(user){
              res.json(user);
            }).catch(function(err){
              done(err);
            });

});

module.exports = router;
