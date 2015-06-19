'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/user-repository.js';
import SessionRepository from '../repos/session-repository.js';
var router = express.Router();

router.get('/signup', function(req, res) {

  var emailAddress = req.query['emailAddress'];
  var firstName = req.query['firstName'];
  var lastName = req.query['lastName'];
  var session = req.user; //session object, supplied by Bearer strategy

  var userRepo = new UserRepository();
  userRepo.updateUser(emailAddress, firstName, lastName, session.providerName, session.providerUserId)
              .then(function(user) {
                  res.json(user);
              })
              .catch(function (e) {
                  res.status(500).send(e.message);
              });
});

module.exports = router;
