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


describe('User Sign In', function(){

  describe('sign in user', function() {
    it('should sign in existing user', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';


      httpsAgent.post('https://basestackjs.com:3000/auth/signup')
        .send({ emailAddress: mockEmail, password: mockPassword })
        .end((err, res) => {

            assert.isDefined(res.body, 'there was a user created');

            httpsAgent.post('https://basestackjs.com:3000/auth/signin')
              .send({ emailAddress: mockEmail, password: mockPassword })
              .end((err, res) => {

                  assert.isDefined(res.body, 'user was logged in');
                  assert.equal(mockEmail, res.body.emailAddress);
                  done();
              });

        });
    })
  });

  describe('sign in user - incorrect password', function() {
    it('should NOT allow a user to sign in with incorrect password', function(done) {

      var randomizer = new RandomizerService();
      var mockPassword = randomizer.getRandomUUIDv4();
      var mockEmail = randomizer.getRandomUUIDv4().substring(0,4) + '@test.com';

      httpsAgent.post('https://basestackjs.com:3000/auth/signup')
        .send({ emailAddress: mockEmail, password: mockPassword })
        .end((err, res) => {
            assert.isDefined(res.body, 'there was a user created');
            httpsAgent.post('https://basestackjs.com:3000/auth/signin')
              .send({ emailAddress: mockEmail, password: 'boguspassword' })
              .end((err, resSignIn) => {
                  assert.isUndefined(resSignIn.body.emailAddress, 'user was not logged in');
                  done();
              });
        });
    })
  });

  describe('sign in user with invalid email address', function() {
    it('should return a null user', function(done) {

        //TODO
        done();
    })
  });

  describe('sign in user with blank email address', function() {
    it('should return a null user', function(done) {

        //TODO
        done();
    })
  });

  describe('sign in user with blank password', function() {
    it('should return a null user', function(done) {

        //TODO
        done();
    })
  });
});
