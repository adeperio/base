'use strict';

//For some reason accessing process.env.NODE_ENV is not matching up the actual JSON object returned by JSON.stringify(env)
//So we are doing this wierd loop through the JSON object properties and gettign the NODE_ENV that way
//Need to investigate this further
var nodeEnv = process.env;
for (var key in process.env) {
  if (process.env.hasOwnProperty(key) && key == 'NODE_ENV') {

    nodeEnv = process.env[key];
  }
}
console.log('Server.js - process.env.NODE_ENV: ' + JSON.stringify(nodeEnv));

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
import csurf from 'csurf';

import signInRoutes from './middleware/routes/sign-in-routes.js';
import signOutRoutes from './middleware/routes/sign-out-routes.js';
import signUpRoutes from './middleware/routes/sign-up-routes.js';
import userRoutes from './middleware/routes/user-routes.js';

import passport from './middleware/auth/passport.js';
import error from './middleware/error/error.js';


var server = express();

// ======== *** VIEWS AND TEMPLATES ***

//Set port
server.set('port', (Config.port || 5000));
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

server.use(methodOverride());
server.use(bodyParser());

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
  saveUninitialized: true,
  expires : new Date(Date.now() + 3600000), //1 Hour
  cookie: { httpOnly:true, secure: true }
}));

//passport setup
server.use(passport.initialize());
server.use(passport.session()); //passport piggy backs of express sessions, still need to set express session options

if(nodeEnv === 'development' || nodeEnv === 'production') {

  // This will add the well-known CAs to 'https.globalAgent.options.ca'
  // useful only for custom certs so NOT used in production
  sslRootCas.inject().addFile(Config.tls.ca);
}



if(nodeEnv === 'development' || nodeEnv === 'production') {
  //CSURF
  console.log('ADDING CSURF: true');
  var valueFunction = function(req){
      var result = (req.body && req.body._csrf)
        || (req.query && req.query._csrf)
        || (req.cookies && req.cookies['XSRF-TOKEN'])
        || (req.headers['csrf-token'])
        || (req.headers['xsrf-token'])
        || (req.headers['x-csrf-token'])
        || (req.headers['x-xsrf-token']);

      return result;
  };

  server.use(csurf({ value: valueFunction }));

  server.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.locals.csrftoken = req.csrfToken();
    next();
  });

} else {

  console.log('ADDING CSURF: false');

}

//enforcing SSL for production environments both
// server.enable('trust proxy'); //use this if working on SSL behind a proxy
// server.use(express_enforces_ssl()); //this enforces a TLS connection


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

if(nodeEnv === 'development' || nodeEnv === 'production') {

  // This will add the well-known CAs to 'https.globalAgent.options.ca'
  // useful only for custom certs so NOT used in production
  sslRootCas.inject().addFile(Config.tls.ca);
}

//credentials
var privateKey  = fs.readFileSync(Config.tls.key, 'utf8');
var certificate = fs.readFileSync(Config.tls.cert, 'utf8');
var ca = fs.readFileSync(Config.tls.ca, 'utf8');
var checkCerts = (nodeEnv != 'test'); //this checks certificates if in production but not on dev (as on dev we are using self signed)

console.log('CHECKING CERTS: ' + checkCerts);
var credentials = {
                    key: privateKey,
                    cert: certificate,
                    ca: ca,
                    requestCert: checkCerts,
                    rejectUnauthorized: checkCerts
                  };

var httpsServer = https.createServer(credentials, server);
httpsServer.listen(server.get('port'), function() {

  console.log('Node Version: ' + process.version);
  if (process.send) {
    console.log('The server is running at https://<yourdomain>.com:' + server.get('port'));
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
