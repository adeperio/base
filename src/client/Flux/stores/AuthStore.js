'use strict';

import assign from 'react/lib/Object.assign';
import _ from 'lodash';
var events = require('eventemitter3');
var eventEmitter = new events.EventEmitter();

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';


var _sessionObject = '';

var AuthStore = {

  getSessionObject: function(){
    return _sessionObject;
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

    case ActionTypes.SESSION_OBJECT_REC:
      _sessionObject = action.data;
      AuthStore.emit(ActionTypes.SESSION_OBJECT_SET);

      break;
    case ActionTypes.REVOKE_RES:
        AuthStore.emit(ActionTypes.REVOKE_RES);
        break;
    case ActionTypes.SIGNUP_RES:

        AuthStore.emit(ActionTypes.SIGNUP_RES);
        break;
    case ActionTypes.SIGNUP_ERR:

        AuthStore.emit(ActionTypes.SIGNUP_ERR);
        break;


    default:
      // Do nothing
  }

});

module.exports = AuthStore;
