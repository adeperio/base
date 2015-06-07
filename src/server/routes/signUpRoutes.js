'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../repos/store/UserRepository.js';
import SessionRepository from '../repos/store/SessionRepository.js';
var router = express.Router();

router.get( '/signup', passport.authenticate('bearer', { session: false }), function(req, res) {



});

module.exports = router;
