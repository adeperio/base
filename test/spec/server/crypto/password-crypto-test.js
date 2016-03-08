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
        passwordCrypto.hashPassword(pwd, function(err, key){
              assert.equal(key.toString('hex'), 'dbe6481076b1a8614d70286274109643b4621e12ce3e14b45028b90b8b45e7dcf39a893179d083e2f2f9c24c0c061141e6443c6976013d0741dd050781e6e13f92b6e4e3bed675496233607d5ce3e94d1e3da597c304e300c04eb49b5d6305a9ea48310eb4898b908dac10bdb30e6535e9477b4de7d357fbd078658091277f3cebe3a52d86df0e04b45fcebacbfafcc0568b57e858e003b51c4398e00dbc8def8697e7f7b6e8c5ed2382896a97e4ad0d2263637f30cd715355a1dfcd91e523cf921b92104a101dd0ae1778de9cd221709cb3cbeb81566412489b2b008a5f4744698b88077e27b715cfb5e9e958c257ec9c1285f5d8476d0b497d32445679c98b149f4289a2669151fb35523ecdcd43169a4dacf827529c5653ec9fc076f4539e0ea1ab491e9bad8caaae67919012f2643ef4c4ae9a704dd53f19c2388bcba6118928db05927779acd2ee11bc994fc8cd5202c039746e8cda99db347c9f18b1cec4f9715987e8f0b10e78288016d19222c75ecd7bc03da2e87cf7b1a7ddb758a428d0102d23d209eea9c5e727f1674280b6c24540480e0470b3af1af00678379a292461596d9550acdcc52ba0a735bceaad2447b565438ffa67dd1058e8958040baee2e56bdb4248a95c54a2a5d90f8cbeb93022e4ce6c96ae5485440683b7d86b7e4b5b4de6fdffee432f44fde73f4573a82a27ee15689bccc44a1d201079e19');
              done();
        });

    })
  });

  describe('verifyPassword', function() {
    it('should correctly verify a password', function(done) {

        var pwd = 'my-password';
        var passwordCrypto = new PasswordCrypto();
        passwordCrypto.hashPassword(pwd, function(err, key){
              assert.equal(key.toString('hex'), 'dbe6481076b1a8614d70286274109643b4621e12ce3e14b45028b90b8b45e7dcf39a893179d083e2f2f9c24c0c061141e6443c6976013d0741dd050781e6e13f92b6e4e3bed675496233607d5ce3e94d1e3da597c304e300c04eb49b5d6305a9ea48310eb4898b908dac10bdb30e6535e9477b4de7d357fbd078658091277f3cebe3a52d86df0e04b45fcebacbfafcc0568b57e858e003b51c4398e00dbc8def8697e7f7b6e8c5ed2382896a97e4ad0d2263637f30cd715355a1dfcd91e523cf921b92104a101dd0ae1778de9cd221709cb3cbeb81566412489b2b008a5f4744698b88077e27b715cfb5e9e958c257ec9c1285f5d8476d0b497d32445679c98b149f4289a2669151fb35523ecdcd43169a4dacf827529c5653ec9fc076f4539e0ea1ab491e9bad8caaae67919012f2643ef4c4ae9a704dd53f19c2388bcba6118928db05927779acd2ee11bc994fc8cd5202c039746e8cda99db347c9f18b1cec4f9715987e8f0b10e78288016d19222c75ecd7bc03da2e87cf7b1a7ddb758a428d0102d23d209eea9c5e727f1674280b6c24540480e0470b3af1af00678379a292461596d9550acdcc52ba0a735bceaad2447b565438ffa67dd1058e8958040baee2e56bdb4248a95c54a2a5d90f8cbeb93022e4ce6c96ae5485440683b7d86b7e4b5b4de6fdffee432f44fde73f4573a82a27ee15689bccc44a1d201079e19');
              done();
        });

    })
  });
});
