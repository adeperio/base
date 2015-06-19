'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/user-repository.js';
var router = express.Router();

router.get('/me', function(req, res) {

  console.log('ME: ' + JSON.stringify(req.user));
  res.json(req.user);
});

module.exports = router;
