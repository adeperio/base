'use strict';

import path from 'path';
import express from 'express';

import config from './config.js';
import authRoutes from './routes/authRoutes.js';

import passport from 'passport';
import passportgoogle from 'passport-google';
var GoogleStrategy = passportgoogle.Strategy;

var server = express();

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/callback',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    done();
  }
));

//Set port
server.set('port', (process.env.PORT || 5000));
server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');

//Setup location to static assets
server.use(express.static(path.join(__dirname)));

//set configs
global.Config = new config();

//setup routes
server.use('/auth', authRoutes);

//Initial SPA load
server.get('/*', function (req, res) {
  res.render('index');
});


//Run up the server
server.listen(server.get('port'), function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
