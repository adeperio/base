'use strict'

import express from 'express';
import passport from 'passport';
import IsAuthenticated from '../auth/passport-auth-check.js';
var router = express.Router();

router.get('/signout', IsAuthenticated, function(req, res) {
  
  req.logout();
  req.session.messages = 'Logged out successfully';
  return res.redirect('/');

});

module.exports = router;
