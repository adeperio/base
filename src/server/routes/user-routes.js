'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/user-repository.js';
import IsAuthenticated from '../middleware/auth/passport-auth-check.js';

var router = express.Router();

router.get('/me', IsAuthenticated, function(req, res) {

  res.json(req.user);

});

module.exports = router;
