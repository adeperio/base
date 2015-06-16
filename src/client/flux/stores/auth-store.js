'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import Session from '../models/session';

var EventEmitter = Events.EventEmitter;
var _sessionObject = new Session();

// Public Getters
const AuthStore = assign({}, EventEmitter.prototype, {

  getSessionObject: function() {

    if(!_sessionObject.accessToken || !_sessionObject.emailAddress) {
      var session = getSessionGlobal(); //global function call, see index.jade for function
      _sessionObject.accessToken = session.accessToken;
      _sessionObject.emailAddress = session.emailAddress;
    }
    return _sessionObject;
    
  }
});

//AuthStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.REVOKE_RES:
        AuthStore.emit(ActionTypes.REVOKE_RES);
        break;
    case ActionTypes.SIGNUP_RES:
        var user = action.data;
        _sessionObject.emailAddress = user.emailAddress;
        AuthStore.emit(ActionTypes.SIGNUP_RES);
        break;
    case ActionTypes.SIGNUP_ERR:
        AuthStore.emit(ActionTypes.SIGNUP_ERR);
        break;
    default:
      // Do nothing
  }
};

//Register callback
AuthStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = AuthStore;
