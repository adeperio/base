// 'use strict'
// import winston from 'winston';
// import assert from 'assert';
// import appRoot from 'app-root-path';
//
// var config = require(appRoot + '/src/server/config.js');
// var Mapper = require(appRoot + '/src/server/repos/pg-data-mapper.js');
// var userRows = require(appRoot + '/test/resources/userRows.json');
//
// describe('pg data mapper', function(){
//
//   before(function(done){
//     global.Config = new config();
//     winston.level = 'debug';
//     done();
//   });
//
//   describe('mapToUsers', function(){
//     it('should get an array of user objects', function(done){
//
//       var mapper = new Mapper();
//       mapper.mapToUsers(userRows)
//           .then(function(rows){
//               winston.log('debug', JSON.stringify(rows));
//               assert.equal(0, rows.length);
//               done();
//           }).catch(function(err){
//               throw err;
//           });
//
//     })
//   });
//
//
// });
