'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import SessionRepository from '../repos/store/SessionRepository.js';
var router = express.Router();

router.get( '/signup', passport.authenticate('bearer', { session: false }), function(req, res) {

  var session = req.user; //session object, supplied by Bearer strategy
  
  var firstName = req.query['firstName'];
  var lastName = req.query['lastName'];
  var emailAddress = req.query['emailAddress'];


  var userRepo = new UserRepository();


  userRepo.updateUser()



  .then(function(messages) {
            res.json(messages);
        })
        .catch(function (e) {
            res.status(401).send(e.message);
        });

});

module.exports = router;
