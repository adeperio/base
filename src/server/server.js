'use strict';

//set configs
import config from './config.js';
global.Config = new config();

import path from 'path';
import express from 'express';
import signInRoutes from './routes/signInRoutes.js';
import signOutRoutes from './routes/signOutRoutes.js';
import signUpRoutes from './routes/signUpRoutes.js';
import userRoutes from './routes/userRoutes.js';
import passport from './middleware/passport.js';

var server = express();

//Set port
server.set('port', (process.env.PORT || 5000));
server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');

//Setup location to static assets
server.use(express.static(path.join(__dirname)));

//middle ware setup
server.use(passport.initialize());
server.use(passport.session());

//setup routes
server.use('/auth', signInRoutes);
server.use('/auth', signOutRoutes);
server.use('/auth', signUpRoutes);
server.use('/', userRoutes);


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
