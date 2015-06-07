'use strict'

import express from 'express';
import passport from 'passport';
import SessionRepository from '../repos/store/SessionRepository.js';
var router = express.Router();

router.get('/signout', passport.authenticate('bearer', { session: false }), function(req, res) {

  var emailAddress = req.query['emailAddress'];

  var sessionRepo = new SessionRepository();
  sessionRepo.updateUser(emailAddress, firstName, lastName, session.auth_provider_name, session.auth_provider_user_id)
              .then(function(user) {
                  res.redirect('/home');
              })
              .catch(function (e) {
                  res.status(500).send(e.message);
              });

});

module.exports = router;
