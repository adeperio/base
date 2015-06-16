'use strict'
import winston from 'winston';
import assert from 'assert';
import appRoot from 'app-root-path';
import rewire from 'rewire';

var AuthStore = rewire(appRoot + '/src/client/flux/stores/auth-store.js');
var registeredCallback = AuthStore.__get__("DispatcherCallBack");

describe('auth-store', function(){

  before(function(done){
    global.Config = new config();
    winston.level = 'debug';
    done();
  });

  beforeEach(function () {
    AuthStore = rewire(appRoot + '/src/client/flux/stores/auth-store.js');
    registeredCallback = this.AuthStore.__get__("DispatcherCallBack");
  });

});
