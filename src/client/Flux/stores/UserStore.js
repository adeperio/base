'use strict';

import assign from 'react/lib/Object.assign';
import _ from 'lodash';
var events = require('eventemitter3');
var eventEmitter = new events.EventEmitter();

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

var _me = null;

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
      _me = action.data;
      UserStore.emit(ActionTypes.ME_RES);
      break;


    default:
      // Do nothing
  }

});

module.exports = UserStore;
