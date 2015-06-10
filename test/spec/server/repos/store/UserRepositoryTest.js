'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';

var UserRepository = require(appRoot + '/src/server/repos/store/user-repository.js');
var RandomizerService = require(appRoot + '/src/server/services/RandomizerService.js');
var ProviderLookup = require(appRoot + '/src/server/repos/store/provider-lookup.js');
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
      var mockProviderId = randomizer.getRandomUUIDv4();
      var userRepo = new UserRepository();
      userRepo.createUser(ProviderLookup.Google, mockProviderId)
        .then(function(rows){
            winston.log('debug', JSON.stringify(rows));
            assert.equal(1, rows.length);
            done();
        }).catch(function(err){
          done(err);
        });
    })
  });


  describe('updateUser', function(){
    it('should update user, and return the updated user', function(done){

      var randomizer = new RandomizerService();
      var mockProviderId = randomizer.getRandomUUIDv4();
      var userRepo = new UserRepository();

      var mockEmail = randomizer.getRandomUUIDv4();
      var mockFirstName = randomizer.getRandomUUIDv4();
      var mockLastName = randomizer.getRandomUUIDv4();

      userRepo.createUser(ProviderLookup.Google, mockProviderId)
        .then(function(users){
            return userRepo.updateUser(mockEmail, mockFirstName, mockLastName, ProviderLookup.Google, mockProviderId);
        }).then(function(updateduser){
            winston.log('debug', JSON.stringify(updateduser));
            assert.equal(mockEmail, updateduser.email_address);
            assert.equal(mockFirstName, updateduser.first_name);
            assert.equal(mockLastName, updateduser.last_name);
            done();
        }).catch(function(err){
          done(err);
        });
    })
  });
});
