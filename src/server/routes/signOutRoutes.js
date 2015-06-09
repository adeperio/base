'use strict'

import express from 'express';
import passport from 'passport';
import SessionRepository from '../repos/store/SessionRepository.js';
var router = express.Router();

router.get('/signout', passport.authenticate('bearer', { session: false }), function(req, res) {

  var session = req.user; //session object, supplied by Bearer strategy

  var sessionRepo = new SessionRepository();
  sessionRepo.deleteSession(session.base_access_token)
              .then(function(result) {
                  if(result ==1){
                    res.redirect('/');
                  }
              })
              .catch(function (e) {
                  res.status(500).send(e.message);
              });

});

module.exports = router;
