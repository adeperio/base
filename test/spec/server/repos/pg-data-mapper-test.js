'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';

var config = require(appRoot + '/src/server/config.js');
var Mapper = require(appRoot + '/src/server/repos/pg-data-mapper.js');
var userRows = require(appRoot + '/test/resources/userRows.json');
var userRowFilled = require(appRoot + '/test/resources/userRowFilled.json');

describe('pg data mapper', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  describe('mapToUser', function(){
    it('should get an array of user objects', function(done){

      var mapper = new Mapper();
      var user = mapper.mapToUser(userRowFilled);
      winston.log('debug', JSON.stringify(user));
      assert.equal('test1@email.com', user.emailAddress);
      assert.equal('firstName1', user.firstName);
      assert.equal('lastName1', user.lastName);
      assert.equal('myuser1bio', user.bio);
      done();

    })
  });


});
