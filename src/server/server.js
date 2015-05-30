'use strict';

import path from 'path';
import express from 'express';
import nylas from 'nylas';

import config from './config.js';
import authRoutes from './routes/authRoutes.js';

import AuthService from './services/AuthService.js';
import NylasAuthStrategy from './nylas/NylasAuthStrategy.js';

var server = express();

//Set port
server.set('port', (process.env.PORT || 5000));
server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');

//Setup location to static assets
server.use(express.static(path.join(__dirname)));

//set configs
global.Config = new config();

//Set singleton Auth Service
global.AuthService = new AuthService(new NylasAuthStrategy());

//setup routes
server.use('/oauth', authRoutes);

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
