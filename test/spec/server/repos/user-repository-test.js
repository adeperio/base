'use strict'
import winston from 'winston';
import chai from 'chai';
var assert = chai.assert;
var expect = chai.expect;
import appRoot from 'app-root-path';

var UserRepository = require(appRoot + '/src/server/repos/user-repository.js');
var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');
var ProviderLookup = require(appRoot + '/src/server/middleware/auth/provider-lookup.js');
var config = require(appRoot + '/src/server/config.js');

describe('user-repository', function(){

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
      .then(function(user){
          assert.isNull(user, 'user is null');
          done();
      }).catch(function(err){
        done(err);
      });
    })
  });

  describe('getUserForEmailAndPassword', function(){
    it('should retrieve one user', function(done){

      var userRepo = new UserRepository();

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      userRepo.createUser(mockEmail, mockPassword)
        .then(function(createdUser){
            winston.log('debug', JSON.stringify(createdUser));
            assert.isDefined(createdUser, 'there was a user created');
            assert.equal(mockEmail, createdUser.emailAddress);

            userRepo.getUserForEmailAndPassword(mockEmail, mockPassword)
            .then(function(user){
                winston.log('debug', JSON.stringify(user));
                assert.isDefined(user, 'there was a user created');
                assert.equal(mockEmail, user.emailAddress);
                done();
            }).catch(function(err){
              done(err);
            });


        }).catch(function(err){
          done(err);
        });
    })
  });

  describe('getUserForEmailAndPassword', function(){
    it('should get no user', function(done){

      var userRepo = new UserRepository();
      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      userRepo.getUserForEmailAndPassword(mockEmail, mockPassword)
      .then(function(user){
          assert.isNull(user, 'user is null');
          done();
      }).catch(function(err){
        done(err);
      });
    })
  });


  describe('createUser', function(){
    it('should return newly inserted user row or retun null', function(done){

      var userRepo = new UserRepository();

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      userRepo.createUser(mockEmail, mockPassword)
        .then(function(createdUser){
            winston.log('debug', JSON.stringify(createdUser));
            assert.isDefined(createdUser, 'there was a user created');
            assert.equal(mockEmail, createdUser.emailAddress);
            done();
        }).catch(function(err){
          done(err);
        });
    })
  });

  describe('createUser', function(){
    it('should ERROR if inserting an existign row', function(done){

      var userRepo = new UserRepository();

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      userRepo.createUser(mockEmail, mockPassword)
        .then(function(createdUser){
            winston.log('debug', JSON.stringify(createdUser));
            assert.isDefined(createdUser, 'there was a user created');
            assert.equal(mockEmail, createdUser.emailAddress);

            userRepo.createUser(mockEmail, mockPassword)
              .then(function(createdUser){
                  winston.log('debug', JSON.stringify(createdUser));
                  assert.isDefined(createdUser, 'there was a user created');
                  assert.equal(mockEmail, createdUser.emailAddress);
                  done();
              }).catch(function(err){
                assert.isDefined(err, 'Checks for existing record correctly');
                done();
              });

        }).catch(function(err){
          done(err);
        });


    })
  });

  describe('createOrRetrieveUser', function(){
    it('should return newly inserted user row or an existing user row', function(done){

      var randomizer = new RandomizerService();
      var mockProviderId = randomizer.getRandomUUIDv4();
      var userRepo = new UserRepository();

      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';
      var mockFirstName = randomizer.getRandomUUIDv4();
      var mockLastName = randomizer.getRandomUUIDv4();

      userRepo.createOrRetrieveUser(mockEmail, mockFirstName, mockLastName, ProviderLookup.Google, mockProviderId)
        .then(function(createdUser){
            winston.log('debug', JSON.stringify(createdUser));
            assert.isDefined(createdUser, 'there was a user created');
            assert.equal(mockEmail, createdUser.emailAddress);
            assert.equal(mockFirstName, createdUser.firstName);
            assert.equal(mockLastName, createdUser.lastName);
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

      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';
      var mockFirstName = randomizer.getRandomUUIDv4();
      var mockLastName = randomizer.getRandomUUIDv4();

      userRepo.createOrRetrieveUser('', '', '', ProviderLookup.Google, mockProviderId)
        .then(function(users){
            return userRepo.updateUser(mockEmail, mockFirstName, mockLastName, ProviderLookup.Google, mockProviderId);
        }).then(function(updateduser){
            winston.log('debug', JSON.stringify(updateduser));
            assert.equal(mockEmail, updateduser.emailAddress);
            assert.equal(mockFirstName, updateduser.firstName);
            assert.equal(mockLastName, updateduser.lastName);
            done();
        }).catch(function(err){
          done(err);
        });
    })
  });

  describe('updateUserInvalidEmail', function(){
    it('should throw an error on invalid email', function(done){

      var randomizer = new RandomizerService();
      var mockProviderId = randomizer.getRandomUUIDv4();


      var mockEmail = 'sfasfasf';
      var mockFirstName = randomizer.getRandomUUIDv4();
      var mockLastName = randomizer.getRandomUUIDv4();

      setTimeout( function () {

        expect(function(){
          var userRepo = new UserRepository();
          return userRepo.updateUser(mockEmail, mockFirstName, mockLastName, ProviderLookup.Google, mockProviderId);
        }).to.throw(Error);

        done();

      }, 100 );
    })
  });
});
