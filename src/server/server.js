'use strict';

import path from 'path';
import express from 'express';
import config from './config.js';
import authRoutes from './routes/authRoutes.js';

import passport from 'passport';
import passportGoogleOauth2 from 'passport-google-oauth2';
var GoogleStrategy = passportGoogleOauth2.Strategy;

//set configs
global.Config = new config();

var server = express();

passport.use(new GoogleStrategy({
  clientID:     Config.auth.clientID,
  clientSecret: Config.auth.clientSecret,
  callbackURL: Config.auth.callbackURL,
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done();
  }
));

//Set port
server.set('port', (process.env.PORT || 5000));
server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');

//Setup location to static assets
server.use(express.static(path.join(__dirname)));



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
