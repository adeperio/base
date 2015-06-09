'use strict';

import assign from 'react/lib/Object.assign';
import _ from 'lodash';
var events = require('eventemitter3');
var eventEmitter = new events.EventEmitter();

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Session from '../models/Session';
var _sessionObject = new Session();

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
      var sessionData = action.data;
      _sessionObject.access_token = sessionData.access_token;
      _sessionObject.email_address = sessionData.email_address;

      AuthStore.emit(ActionTypes.SESSION_OBJECT_SET);
      break;
    case ActionTypes.REVOKE_RES:
        AuthStore.emit(ActionTypes.REVOKE_RES);
        break;
    case ActionTypes.SIGNUP_RES:
        var user = action.data;
        _sessionObject.email_address = user.email_address;
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
