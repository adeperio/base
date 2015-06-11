'use strict';

import assign from 'react/lib/Object.assign';
import _ from 'lodash';
var events = require('eventemitter3');
var eventEmitter = new events.EventEmitter();

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import User from '../models/user';

var _me = new User();

var UserStore = {

  getMe: function(){
    return _me;
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

UserStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.ME_RES:
      var user = action.data;
      _me.emailAddress = user.emailAddress;
      _me.firstName = user.firstName;
      _me.lastName = user.lastName;
      UserStore.emit(ActionTypes.ME_RES);
      break;

    default:
      // Do nothing
  }

});

module.exports = UserStore;
