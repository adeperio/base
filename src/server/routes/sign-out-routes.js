'use strict'

import express from 'express';
import passport from 'passport';
var router = express.Router();

router.get('/signout', function(req, res) {

  return res.redirect('/');

  // if(req.isAuthenticated()){
  //   req.logout();
  //   req.session.messages = 'Logged out successfully';
  //
  // }
});

module.exports = router;
