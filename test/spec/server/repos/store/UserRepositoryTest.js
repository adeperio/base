
'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';

var UserRepository = require(appRoot + '/src/server/repos/store/UserRepository.js');
var ProviderLookup = require(appRoot + '/src/server/repos/store/ProviderLookup.js');
var config = require(appRoot + '/src/server/config.js');

describe('user store repository', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  describe('getUser', function(){
    it('should get no user', function(done){

      var userRepo = new UserRepository();
      userRepo.getUser(ProviderLookup.Google, 'testprovideruserid')
      .then(function(rows){

          winston.log('debug', JSON.stringify(rows));
          done();
      });
    })
  });

  describe('createUser', function(){
    it('should return newly inserted user row or an existing user row', function(done){

      var userRepo = new UserRepository();
      userRepo.createUser(ProviderLookup.Google, 'testprovideruserid')
      .then(function(rows){

          winston.log('debug', JSON.stringify(rows));
          done();
      });
    })
  });
});
