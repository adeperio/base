'use strict'

import winston from 'winston';
import appRoot from 'app-root-path';
import chai from 'chai';
var assert = chai.assert;
var expect = chai.expect;

var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');
var SessionStore = require(appRoot + '/src/client/session-store.js');
var config = require(appRoot + '/src/server/config.js');

//emulates attaching the session object to window


describe('session-store', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';

    var sessionStore = new SessionStore();
    global.sessionStoreGlobal = sessionStore;

    done();
  });


  describe('getSessionGlobal and setSessionGlobal', function(){
    it('should return the correct session from a global function', function(done){

      var randomizer = new RandomizerService();
      var mockAccessToken = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4();

      sessionStoreGlobal.setSessionGlobal(mockAccessToken, mockEmail);

      var globalSession = sessionStoreGlobal.getSessionGlobal();

      assert.isNotNull(globalSession, 'global session created');
      assert.equal(mockAccessToken, globalSession.accessToken);
      assert.equal(mockEmail, globalSession.emailAddress);

      done();
    })
  });

});
