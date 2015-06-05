'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';
import query from 'pg-query';

var SessionRepository = require(appRoot + '/src/server/repos/store/SessionRepository.js');
var RandomizerService = require(appRoot + '/src/server/services/RandomizerService.js');
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
      var test_token = randomizer.getRandomUUIDv4();

      var sessionRepo = new SessionRepository();
      sessionRepo.createSession(userRow, test_token)
                    .then(function(sessions){
                        assert.equal(1, sessions.length);
                        done();
                    }).catch(function(err){
                        done(err);
                    });
    })
  });


});
