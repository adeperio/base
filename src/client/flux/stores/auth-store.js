'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';

var EventEmitter = Events.EventEmitter;

// Public Getters
const AuthStore = assign({}, EventEmitter.prototype, {

});

//AuthStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.SIGNOUT_RES:
        var signoutRes = action.data;

        if(!signoutRes.err){
          AuthStore.emit(ActionTypes.SIGNOUT_RES);
        } else{
          AuthStore.emit(ActionTypes.SIGNOUT_ERR);
        }



        break;
    default:
      // Do nothing
  }
};

//Register callback
AuthStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = AuthStore;
