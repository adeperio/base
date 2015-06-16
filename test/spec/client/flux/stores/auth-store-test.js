'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';

describe('auth-store', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

});
