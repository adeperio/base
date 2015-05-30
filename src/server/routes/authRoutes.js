import express from 'express';
import UserRepository from '../repos/store/UserRepository.js';
import SessionRepository from '../repos/store/SessionRepository.js';
import RandomizerService from '../services/RandomizerService.js';

var router = express.Router();

router.get('/connect/:email', function(req, res, next) {
    var email = req.params.email;
    var authServerUrl = AuthService.urlForAuthentication(email);
    res.redirect(authServerUrl);
});

router.get('/callback', function (req, res, next) {
    var authCode = req.query.code;

    if (authCode) {

      AuthService.exchangeCodeForToken(authCode)
        .then(function(nylasToken) {
            var sessionRepo = new SessionRepository();
            return sessionRepo.createSession(nylasToken);
        })
        .then(function(baseToken){
          res.render('index', { sessionToken : baseToken});
        });


    } else if (req.query.error) {
        res.redirect('/error');
    }
});


router.get('/revoke', function (req, res, next) {
  var headerKvp = req.headers.authorization.split(' ');
  var accessToken = headerKvp[1];

  var sessionRepo = new SessionRepository();
  sessionRepo.getSession(accessToken)
    .then(function(session){

      if(session){
        return Auth.revoke(session);
      } else{
        throw new Error('No active session open');
      }

    })
    .then(function() {

    })
    .catch(function (e) {
        res.status(401).send(e.message);
    });
});

module.exports = router;
