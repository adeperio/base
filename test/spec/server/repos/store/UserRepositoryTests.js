
'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';

var UserRepository = require(appRoot + '/src/server/repos/store/UserRepository.js');
var ProviderLookup = require(appRoot + '/src/server/repos/store/ProviderLookup.js');
var config = require(appRoot + '/src/server/config.js');

describe('user store repository', function(){

  beforeEach(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  describe('get user with non existant provider id', function(){
    it('should get no user', function(done){

      var userRepo = new UserRepository();

      userRepo.getUser(ProviderLookup.Google, 'testprovideruserid')
      .then(function(result){
          winston.log('debug', JSON.stringify(result));
          done();
      });

    })
  });
});
