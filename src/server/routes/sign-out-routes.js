'use strict'

import express from 'express';
import passport from 'passport';
var router = express.Router();

router.get('/signout', function(req, res) {

  if(req.isAuthenticated() && req.user){
    req.logout();
    req.session.messages = 'Logged out successfully';

    res.json({
      err: null,
      body: {}
    });

  }



});

module.exports = router;
