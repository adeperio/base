'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';


var config = require(appRoot + '/src/server/config.js');

var mapper = require(appRoot + '/src/server/repos/pg-data-mapper.js');
var userRows = require(appRoot + '/test/resources/userRows.json');
var userRowFilled = require(appRoot + '/test/resources/userRowFilled.json');
var sessionRow = require(appRoot + '/test/resources/sessionRow.json');

describe('pg-data-mapper', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  describe('mapToUser', function(){
    it('should get a user object', function(done){

      mapper.mapToUserAsync(userRowFilled)
      .then(function(user){
        winston.log('debug', JSON.stringify(user));
        assert.equal('test1@email.com', user.emailAddress);
        assert.equal('firstName1', user.firstName);
        assert.equal('lastName1', user.lastName);
        assert.equal('myuser1bio', user.bio);
        done();
      }).catch(function(e){
        done(e);
      });
    })
  });

  describe('mapToUsers', function(){
    it('should get an array of user objects', function(done){

      mapper.mapToUsersAsync(userRows)
      .then(function(users){
        winston.log('1. ', JSON.stringify(users));
        done();
      }).catch(function(e){
        winston.log('1. ', JSON.stringify(e));
        done(e);
      });


    })
  });

  describe('mapToSession', function(){
    it('should get a session object', function(done){

      mapper.mapToSessionAsync(sessionRow)
      .then(function(session){
        assert.equal('test1@email.com', session.user.emailAddress);
        assert.equal('baseToken1', session.baseToken);
        done();
      }).catch(function(e){
        done(e);
      });
    })
  });


});
