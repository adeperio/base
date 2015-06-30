'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import User from '../models/user';

var EventEmitter = Events.EventEmitter;
var _userItems = [];

// Public Getters
const UserItemStore = assign({}, EventEmitter.prototype, {

  getUserItems: function() {
    return _userItems;
  }

});

//UserItemStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.ADD_ITEM_RES:
        var addedItem = action.data;
        if(addedItem){
          _userItems.push(addedItem);
          UserItemStore.emit(ActionTypes.ADD_ITEM_RES);
        } else {
          UserItemStore.emit(ActionTypes.ADD_ITEM_ERR);
        }

        break;
    case ActionTypes.GET_USER_ITEMS_RES:
        _userItems = action.data;
        if(_userItems){
          UserItemStore.emit(ActionTypes.GET_USER_ITEMS_RES);
        } else {
          UserItemStore.emit(ActionTypes.GET_USER_ITEMS_ERR);
        }

        break;
    default:
      // Do nothing
  }
};


UserItemStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = UserItemStore;
