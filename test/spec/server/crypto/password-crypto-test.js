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

var PasswordCrypto = require(appRoot + '/src/server/crypto/password-crypto.js');
var RandomizerService = require(appRoot + '/src/server/services/randomizer-service.js');


describe('Password Crypto', function(){

  describe('hashPassword', function() {
    it('should correctly return hash of a password', function(done) {
        var pwd = 'my-password';

        var passwordCrypto = new PasswordCrypto();
        passwordCrypto.hashPassword(pwd, function(err, key) {
            assert.isNull(err);
            assert.isDefined(key);
            done();
        });
    })
  });

  describe('verifyPassword', function() {
    it('should correctly verify a password', function(done) {

        var pwd = 'my-password';

        var passwordCrypto = new PasswordCrypto();
        passwordCrypto.hashPassword(pwd, function(err, key) {

            assert.isNull(err);
            assert.isDefined(key);

            passwordCrypto.verifyPassword(pwd, key, function(err, isVerified) {
                  
                  assert.isNull(err);
                  assert.isTrue(isVerified);
                  done();
            })
        });
    })
  });
});
