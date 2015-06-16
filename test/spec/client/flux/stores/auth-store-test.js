'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';
import rewire from 'rewire';

var config = require(appRoot + '/src/server/config.js');
// var sessionStore = require(appRoot + '/src/client/session-store.js');

describe('auth-store', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  beforeEach(function () {
    this.AuthStore = rewire(appRoot + '/src/client/flux/stores/auth-store.js');
    this.registeredCallback = this.AuthStore.__get__("DispatcherCallBack");
  });

  describe('getSessionObject', function(){
    it('should return the correct session from a global function', function(done){

      // var randomizer = new RandomizerService();
      // var mockProviderToken = randomizer.getRandomUUIDv4();
      // var mockProviderName = randomizer.getRandomUUIDv4();
      // var mokeProviderUserId = randomizer.getRandomUUIDv4();

      done();
    })
  });

});
