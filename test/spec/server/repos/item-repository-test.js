'use strict'

import winston from 'winston';
import chai from 'chai';
var assert = chai.assert;
var expect = chai.expect;
import appRoot from 'app-root-path';

var UserRepository = require(appRoot + '/src/server/repos/user-repository.js');
var ItemRepository = require(appRoot + '/src/server/repos/item-repository.js');
var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');
var ProviderLookup = require(appRoot + '/src/server/middleware/auth/provider-lookup.js');
var config = require(appRoot + '/src/server/config.js');

describe('Item Repository Tests', function() {

  before(function(done) {
    global.Config = new config();
    winston.level = 'debug';
    var randomizer = new RandomizerService();
    var mockProviderId = randomizer.getRandomUUIDv4();
    var userRepo = new UserRepository();

    var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';
    var mockFirstName = randomizer.getRandomUUIDv4();
    var mockLastName = randomizer.getRandomUUIDv4();

    userRepo.createOrRetrieveUser(mockEmail, mockFirstName, mockLastName, ProviderLookup.Google, mockProviderId)
      .then(function(createdUser){
          global.User = createdUser;
          done();
      }).catch(function(err){
          done(err);
      });
  });

  describe('createItem', function(){
    it('should return newly created item', function(done){

      var itemRepo = new ItemRepository();
      var randomizer = new RandomizerService();
      var mockTitle = randomizer.getRandomUUIDv4();
      var mockDescription = randomizer.getRandomUUIDv4();

      itemRepo.createItem(User._id, mockTitle, mockDescription)
        .then(function(createdItem){

          assert.equal(mockTitle, createdItem.title);
          assert.equal(mockDescription, createdItem.description);
          done();

        }).catch(function(err){
            done(err);
        });

    })
  });


  describe('getItemsForUser', function(){
    it('should return newly created item', function(done){

      var itemRepo = new ItemRepository();
      var randomizer = new RandomizerService();
      var mockTitle = randomizer.getRandomUUIDv4();
      var mockDescription = randomizer.getRandomUUIDv4();

      itemRepo.createItem(User._id, mockTitle, mockDescription)
        .then(function(createdItem){

          mockTitle = randomizer.getRandomUUIDv4();
          mockDescription = randomizer.getRandomUUIDv4();
          return itemRepo.createItem(User._id, mockTitle, mockDescription);
        })
        .then(function(createdItem){

          return itemRepo.getItemsForUser(User._id);
        })
        .then(function(items){
          assert.equal(3, items.length);
          done();

        })
        .catch(function(err){
            done(err)
        });
      })
  });

});
