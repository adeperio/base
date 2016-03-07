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

describe('User Sign Up', function(){

  describe('sign up new user', function() {
    it('should return newly created user', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      httpsAgent.post('https://basestackjs.com:3000/auth/signup')
        .send({ emailAddress: mockEmail, password: mockPassword })
        .end((err, res) => {

            // assert.isNull(res.req, 'there is no req object');
            assert.isDefined(res.body, 'there was a user created');
            assert.equal(mockEmail, res.body.emailAddress);
            done();
        });
    })
  });

  describe('sign up new user with existing email', function() {
    it('should return a null user', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      httpsAgent.post('https://basestackjs.com:3000/auth/signup')
        .send({ emailAddress: mockEmail, password: mockPassword })
        .end((err, res) => {

            assert.isDefined(res.body, 'there was a user created');
            assert.equal(mockEmail, res.body.emailAddress);

            httpsAgent.post('https://basestackjs.com:3000/auth/signup')
              .send({ emailAddress: mockEmail, password: mockPassword })
              .end((err, resSignUp) => {

                  assert.isUndefined(resSignUp.body.emailAddress, 'user already exists');
                  done();
              });
        });
    })
  });

  describe('sign up new user with invalid email address', function() {
    it('should return a null user', function(done) {

        //TODO
        done();
    })
  });
});
