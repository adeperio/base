'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import User from '../models/user';

var EventEmitter = Events.EventEmitter;
var _me = new User();

// Public Getters
const UserStore = assign({}, EventEmitter.prototype, {

  getMe: function() {
    return _me;
  }
});

//UserStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.ME_RES:

        var user = action.data;
        if(user){
          _me.emailAddress = user.emailAddress;
          _me.firstName = user.firstName;
          _me.lastName = user.lastName;
          UserStore.emit(ActionTypes.ME_RES);
        }
      break;

    case ActionTypes.ME_ERR:
        var err = action.data;
        if(err){
          UserStore.emit(ActionTypes.ME_ERR);
        }
      break;

    case ActionTypes.SIGNUP_RES:
        var user = action.data;
        if(user){
          _me.emailAddress = user.emailAddress;
          _me.firstName = user.firstName;
          _me.lastName = user.lastName;
          UserStore.emit(ActionTypes.SIGNUP_RES);
        }
        break;

    case ActionTypes.SIGNUP_ERR:
        var err = action.data;
        if(err){
          UserStore.emit(ActionTypes.SIGNUP_ERR);
        }
        break;

    case ActionTypes.SIGNOUT_RES:
        var res = action.data;
        if(_.isEmpty(res)){
          UserStore.emit(ActionTypes.SIGNOUT_RES);
        }
        break;

    default:
      // Do nothing
  }
};

UserStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = UserStore;
