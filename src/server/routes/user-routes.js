'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/user-repository.js';
var router = express.Router();

router.get('/me', function(req, res) {

  res.json(req.user);
});

module.exports = router;
