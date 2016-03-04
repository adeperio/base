'use strict'

import winston from 'winston';
import chai from 'chai';
import request from 'supertest';
import appRoot from 'app-root-path';
import express from 'express';
import https from 'superagent';
var httpsAgent = https.agent();

import fs from 'fs';

var assert = chai.assert;
var expect = chai.expect;
var config = require(appRoot + '/src/server/config.js');

global.Config = new config();
// var cert = fs.readFileSync(appRoot + '/' + Config.tls.ca, 'utf8');

describe('sign-up-route', function(){
  describe('sign up new user', function() {
    it('should return newly created user', function(done) {

        httpsAgent.post('https://basestackjs.com:3000/auth/signup')
          // .ca(cert)
          .send({ emailAddress: 'test@test.com', password: 'password' })
          .accept('application/json')
          .end((err, res) => {

              console.log('Test Response: ' + JSON.stringify(res));
              done();

          });
    })
  });
});
