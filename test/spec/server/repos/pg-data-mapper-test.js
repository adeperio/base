'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';


var config = require(appRoot + '/src/server/config.js');

var mapper = require(appRoot + '/src/server/repos/pg-data-mapper.js');
var userRows = require(appRoot + '/test/resources/userRows.json');
var userRowFilled = require(appRoot + '/test/resources/userRowFilled.json');
var itemRow = require(appRoot + '/test/resources/itemRow.json');
var itemRows = require(appRoot + '/test/resources/itemRows.json');


describe('pg-data-mapper', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  describe('mapToItem', function(){
    it('should get an item object', function(done) {

      mapper.mapToItemAsync(itemRow)
        .then(function(item) {
          winston.log('debug', JSON.stringify(item));
          assert.equal(1, item.user._id);
          assert.equal('testItemTitle', item.title);
          assert.equal('testdescription', item.description);
          done();
        }).catch(function(e) {
          done(e);
        });
    })
  });

  describe('mapToItems', function(){
    it('should get an item object', function(done) {

      mapper.mapToItemsAsync(itemRows)
        .then(function(items) {
          winston.log('debug', JSON.stringify(items));
          assert.equal(2, items.length);
          assert.equal('testItemTitle1', items[0].title);
          assert.equal('testdescription1', items[0].description);
          assert.equal('testItemTitle2', items[1].title);
          assert.equal('testdescription2', items[1].description);
          done();
        }).catch(function(e) {
          done(e);
        });
    })
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



});
