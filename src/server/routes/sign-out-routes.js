'use strict'

import express from 'express';
import passport from 'passport';
import SessionRepository from '../repos/session-repository.js';
var router = express.Router();

router.get('/signout', function(req, res) {

  if(req.isAuthenticated()){
    req.logout();
    req.session.messages = req.i18n.__("Log out successfully");
  }

  res.redirect('/');


  // var sessionRepo = new SessionRepository();
  // sessionRepo.deleteSession(session.baseToken)
  //             .then(function(result) {
  //                 if(result ==1){
  //                   res.redirect('/');
  //                 }
  //             })
  //             .catch(function (e) {
  //                 res.status(500).send(e.message);
  //             });

});

module.exports = router;
