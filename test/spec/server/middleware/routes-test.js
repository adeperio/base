'use strict'

import winston from 'winston';
import chai from 'chai';
import request from 'supertest';
import appRoot from 'app-root-path';
import express from 'express';
import https from 'superagent';
import fs from 'fs';

var assert = chai.assert;
var expect = chai.expect;

var config = require(appRoot + '/src/server/config.js');

global.Config = new config();
var cert = fs.readFileSync(appRoot + '/' + Config.tls.ca, 'utf8');

describe('sign-up-route', function(){
  describe('sign up new user', function() {
    it('should return newly created user', function(done) {

        https.post('https://basestackjs.com:3000/auth/signup')
          .send({ emailAddress: 'test@test.com', password: 'password' })
          .accept('application/json')
          .ca(cert)
          .end((err, res) => {

              console.log('Test Response: ' + JSON.stringify(err));
              done();

          });
    })
  });
});
