'use strict'

import winston from 'winston';
import chai from 'chai';
import request from 'supertest';
import appRoot from 'app-root-path';
import express from 'express';
import httpsAgent from 'superagent';
import fs from 'fs';
import _ from 'lodash';

var assert = chai.assert;
var expect = chai.expect;

var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');

describe('User Sign Out', function(){

  describe('sign in user, then signout', function() {
    it('should return a null user', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      //signup
      httpsAgent.post('https://basestackjs.com:3000/auth/signup')
        .send({ emailAddress: mockEmail, password: mockPassword })
        .end((err, res) => {

            //signin
            httpsAgent.get('https://basestackjs.com:3000/auth/signin')
              .send({ emailAddress: mockEmail, password: mockPassword })
              .end((err, res) => {

                  //signout
                  httpsAgent.get('https://basestackjs.com:3000/auth/signout')
                    .end((err, res) => {
                        assert.isTrue(_.isEmpty(res.body)); // true);
                        done();
                    });
              });

        });
    })
  });

  describe('signout when no user signed in', function() {
    it('should return an error', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      //signout
      httpsAgent.get('https://basestackjs.com:3000/auth/signout')
        .end((err, res) => {

            assert.isDefined(err); // true);
            assert.isDefined(res.error); // true);
            done();
        });
    })
  });

});
