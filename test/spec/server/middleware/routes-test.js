'use strict'

import winston from 'winston';
import chai from 'chai';
import request from 'supertest';
import appRoot from 'app-root-path';
import express from 'express';
import httpsAgent from 'superagent';
import fs from 'fs';

var assert = chai.assert;
var expect = chai.expect;

var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');


describe('sign-up-route', function(){
  describe('sign up new user', function() {
    it('should return newly created user', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      httpsAgent.post('https://basestackjs.com:3000/auth/signup')
        .send({ emailAddress: mockEmail, password: mockPassword })
        .end((err, res) => {

          console.log(JSON.stringify(err));
          console.log(JSON.stringify(res.body));

          assert.isDefined(res.body, 'there was a user created');
          assert.equal(mockEmail, res.body.emailAddress);
            done();
        });
    })
  });
});
