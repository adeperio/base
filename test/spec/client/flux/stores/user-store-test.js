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

describe('user-store', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  beforeEach(function () {
    this.UserStore = rewire(appRoot + '/src/client/flux/stores/user-store.js');
    this.registeredCallback = this.UserStore.__get__("DispatcherCallBack");
  });

  describe('getMe', function(){
    it('should return a user object', function(done){

      // var randomizer = new RandomizerService();
      // var mockEmail = randomizer.getRandomUUIDv4();
      // var mockToken = randomizer.getRandomUUIDv4();
      //
      // sessionStoreGlobal.setSessionGlobal(mockToken, '');
      //
      // var user = {
      //   emailAddress: mockEmail
      // };
      //
      // var payload = {
      //   source: PayloadSources.VIEW_ACTION,
      //   action: {
      //     actionType: ActionTypes.SIGNUP_RES,
      //     data: user
      //   }
      // };
      //
      // this.registeredCallback(payload);
      //
      //
      // var sessionObject = this.UserStore.getSessionObject();
      // assert.equal(mockEmail, sessionObject.emailAddress);
      // assert.equal(mockToken, sessionObject.accessToken);

      done();
    })
  });

});
