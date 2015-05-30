'use strict';

import assign from 'react/lib/Object.assign';
import _ from 'lodash';
var events = require('eventemitter3');
var eventEmitter = new events.EventEmitter();

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';


var _accessToken = '';

var AuthStore = {

  getAccessToken: function(){
    return _accessToken;
  },

  emit: function(event) {
    eventEmitter.emit(event);
  },

  on: function(event, callback) {
    eventEmitter.on(event, callback);
  },

  removeListener: function(event, callback) {
    eventEmitter.removeListener(event, callback);
  }
}

AuthStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.ACCESS_TOKEN_REC:
      _accessToken = action.data;
      AuthStore.emit(ActionTypes.ACCESS_TOKEN_REC_SET);

      break;
    case ActionTypes.REVOKE_RES:
        AuthStore.emit(ActionTypes.REVOKE_RES);
        break;

    default:
      // Do nothing
  }

});

module.exports = AuthStore;
