'use strict'
import winston from 'winston';
import appRoot from 'app-root-path';
import rewire from 'rewire';
import chai from 'chai';
var assert = chai.assert;

var PayloadSources = require(appRoot + '/src/client/flux/constants/payload-sources.js');
var ActionTypes = require(appRoot + '/src/client/flux/constants/action-types.js');
var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');
var config = require(appRoot + '/src/server/config.js');
var SessionStore = require(appRoot + '/src/client/session-store.js');

describe('auth-store', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    var sessionStore = new SessionStore();
    global.sessionStoreGlobal = sessionStore;

    done();
  });

  beforeEach(function () {
    this.AuthStore = rewire(appRoot + '/src/client/flux/stores/auth-store.js');
    this.registeredCallback = this.AuthStore.__get__("DispatcherCallBack");
  });

  describe('getSessionObject', function(){
    it('should return the correct session from a global function', function(done){

      var randomizer = new RandomizerService();
      var mockEmail = randomizer.getRandomUUIDv4();
      var mockToken = randomizer.getRandomUUIDv4();

      sessionStoreGlobal.setSessionGlobal(mockToken, '');

      var user = {
        emailAddress: mockEmail
      };

      var payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          actionType: ActionTypes.SIGNUP_RES,
          data: user
        }
      };

      this.registeredCallback(payload);


      var sessionObject = this.AuthStore.getSessionObject();
      assert.equal(mockEmail, sessionObject.emailAddress);
      assert.equal(mockToken, sessionObject.accessToken);

      done();
    })
  });

});
