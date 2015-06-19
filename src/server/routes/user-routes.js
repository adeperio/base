'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/user-repository.js';
import SessionRepository from '../repos/session-repository.js';
var router = express.Router();

router.get('/me', function(req, res) {
  res.json(req.user.user);
});

module.exports = router;
