'use strict'
import winston from 'winston';
import chai from 'chai';
var assert = chai.assert;
import appRoot from 'app-root-path';
import query from 'pg-query';

var SessionRepository = require(appRoot + '/src/server/repos/store/session-repository.js');
var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');
var config = require(appRoot + '/src/server/config.js');
var userRow = require(appRoot + '/test/resources/userRow.json');

describe('session repository', function(){

  before(function(done){
    winston.level = 'debug';
    global.Config = new config();
    query.connectionParameters = Config.connectionString;

    var sqlSetup = 'BEGIN; ' +
                   'LOCK TABLE users IN SHARE ROW EXCLUSIVE MODE; ' +
                   'insert into users (auth_provider_lookup_id_fkey, auth_provider_user_id) ' +
                   'VALUES ('+ userRow.auth_provider_lookup_id_fkey+', \''+ userRow.auth_provider_user_id+'\'); ' +
                   'COMMIT;';

    return query(sqlSetup)
              .then(function(result){
                done();
              });
  });

  describe('createSession', function(){
    it('should return the created session', function(done){

      var randomizer = new RandomizerService();
      var mockProviderToken = randomizer.getRandomUUIDv4();
      var mockProviderName = randomizer.getRandomUUIDv4();
      var mokeProviderUserId = randomizer.getRandomUUIDv4();


      var sessionRepo = new SessionRepository();
      sessionRepo.createSession(userRow, mockProviderToken, mockProviderName, mokeProviderUserId)
                    .then(function(session){
                        console.log('SESSION ' + JSON.stringify(session) + '\n');
                        assert.isNotNull(session, 'created session returned');
                        assert.isNull(session.email_address, 'email is null');
                        done();
                    }).catch(function(err){
                        done(err);
                    });
    })
  });


  describe('getSession', function(){
    it('should return the created session', function(done){

      var randomizer = new RandomizerService();
      var test_provider_token = randomizer.getRandomUUIDv4();

      var sessionRepo = new SessionRepository();
      sessionRepo.createSession(userRow, test_provider_token)
                    .then(function(session){
                        return sessionRepo.getSession(session.base_access_token);
                        done();
                    }).then(function(session){
                        assert.equal(session.auth_provider_access_token, test_provider_token);

                        done();
                    }).catch(function(err){
                        done(err);
                    });
    })
  });


  describe('deleteSession', function(){
    it('should delete a session', function(done){

      var randomizer = new RandomizerService();
      var test_provider_token = randomizer.getRandomUUIDv4();

      var sessionRepo = new SessionRepository();
      sessionRepo.createSession(userRow, test_provider_token)
                    .then(function(session){
                        return sessionRepo.deleteSession(session.base_access_token);
                        done();
                    }).then(function(result){
                        assert.equal(1, result);

                        done();
                    }).catch(function(err){
                        done(err);
                    });
    })
  });


});
