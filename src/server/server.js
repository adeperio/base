'use strict';

//set configs
import config from './config.js';
global.Config = new config();
import express from 'express';

import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import https from 'https';
import fs from 'fs';
import sslRootCas from 'ssl-root-cas';
import helmet from 'helmet';
import express_enforces_ssl from 'express-enforces-ssl';
import pg from 'pg';
import ConnectPg from 'connect-pg-simple';
var pgSession = ConnectPg(session);

import csrf from 'csurf';

import signInRoutes from './routes/sign-in-routes.js';
import signOutRoutes from './routes/sign-out-routes.js';
import signUpRoutes from './routes/sign-up-routes.js';
import userRoutes from './routes/user-routes.js';

import passport from './middleware/auth/passport.js';
import error from './middleware/error/error.js';


var server = express();

// ======== *** VIEWS AND TEMPLATES ***

//Set port
server.set('port', (process.env.PORT || 5000));
server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');

//Setup location to static assets
server.use(express.static(path.join(__dirname)));


// ======== *** SECURITY MIDDLEWARE ***

//setup helmet js
server.use(helmet());

//setting CSP
var scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'", "ajax.googleapis.com", "www.google-analytics.com"];
var styleSources = ["'self'", "'unsafe-inline'", "ajax.googleapis.com"];
var connectSources = ["'self'"];

server.use(helmet.contentSecurityPolicy({
    defaultSrc: ["'self'"],
    scriptSrc: scriptSources,
    styleSrc: styleSources,
    connectSrc: connectSources,
    reportOnly: false,
    setAllHeaders: false,
    safari5: false
}));

//enforcing SSL for production environments both
server.enable('trust proxy'); //use this if working on SSL behind a proxy
server.use(express_enforces_ssl()); //this enforces a TLS connection

//setup express sessions
server.use(cookieParser());
server.use(session({
  store: new pgSession({
    pg : pg,
    conString : Config.connectionString,
    tableName : 'session',
    schemaName: 'public'
  }),
  secret: Config.session.secret,
  resave: false,
  expires : new Date(Date.now() + 3600000), //1 Hour
  cookie: { httpOnly:true, secure: true }
}));

server.use(bodyParser());
server.use(methodOverride());

//csurf protection
server.use(csrf());
server.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});

//passport setup
server.use(passport.initialize());
server.use(passport.session()); //passport piggy backs of express sessions, still need to set express session options

// ========= *** ROUTES ***
server.use('/auth', signInRoutes);
server.use('/auth', signOutRoutes);
server.use('/auth', signUpRoutes);
server.use('/api/v1', userRoutes);

//Error handler middle ware
server.use(error);

server.get('/*', function (req, res) {
  res.render('index');
});


// ========= *** HTTPS setup ***

if(process.env.NODE_ENV === 'development'){

  // This will add the well-known CAs to 'https.globalAgent.options.ca'
  // useful only for custom certs so NOT used in production
  sslRootCas.inject().addFile(Config.tls.ca);
}

//credentials
var privateKey  = fs.readFileSync(Config.tls.key, 'utf8');
var certificate = fs.readFileSync(Config.tls.cert, 'utf8');
var ca = fs.readFileSync(Config.tls.ca, 'utf8');
var credentials = {
                    key: privateKey,
                    cert: certificate,
                    ca: ca
                  };

var httpsServer = https.createServer(credentials, server);
httpsServer.listen(server.get('port'), function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
