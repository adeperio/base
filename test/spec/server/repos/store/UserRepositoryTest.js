'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';

var UserRepository = require(appRoot + '/src/server/repos/store/UserRepository.js');
var RandomizerService = require(appRoot + '/src/server/services/RandomizerService.js');
var ProviderLookup = require(appRoot + '/src/server/repos/store/ProviderLookup.js');
var config = require(appRoot + '/src/server/config.js');

describe('user repository', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  describe('getUser', function(){
    it('should get no user', function(done){

      var randomizer = new RandomizerService();
      var test_token = randomizer.getRandomUUIDv4();
      var userRepo = new UserRepository();
      userRepo.getUser(ProviderLookup.Google, test_token)
      .then(function(rows){
          winston.log('debug', JSON.stringify(rows));
          assert.equal(0, rows.length);
          done();
      }).catch(function(err){
        done(err);
      });
    })
  });

  describe('createUser', function(){
    it('should return newly inserted user row or an existing user row', function(done){

      var randomizer = new RandomizerService();
      var test_token = randomizer.getRandomUUIDv4();
      var userRepo = new UserRepository();
      userRepo.createUser(ProviderLookup.Google, test_token)
      .then(function(rows){
          winston.log('debug', JSON.stringify(rows));
          assert.equal(1, rows.length);
          done();
      }).catch(function(err){
        done(err);
      });
    })
  });
});
