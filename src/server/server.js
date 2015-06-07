'use strict';

//set configs
import config from './config.js';
global.Config = new config();

import path from 'path';
import express from 'express';
import signInRoutes from './routes/signInRoutes.js';
import passport from './passport-auth.js';

var server = express();

server.use(passport.initialize());
server.use(passport.session());

//Set port
server.set('port', (process.env.PORT || 5000));
server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');

//Setup location to static assets
server.use(express.static(path.join(__dirname)));

//setup routes
server.use('/auth', signInRoutes);

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
