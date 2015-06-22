'use strict'

import express from 'express';
import passport from 'passport';
import IsAuthenticated from '../middleware/auth/passport-auth-check.js';
var router = express.Router();

router.get('/signout', IsAuthenticated, function(req, res) {

  req.logout();
  req.session.messages = 'Logged out successfully';

  res.json({
    err: null,
    body: {}
  });

});

module.exports = router;
