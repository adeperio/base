'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import User from '../models/user';
import UserItem from '../models/user-item';

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
          var item = new UserItem();
          item.title = addedItem.title;
          item.description = addedItem.description;
          _userItems.push(item);
          UserItemStore.emit(ActionTypes.ADD_ITEM_RES);
        } else {
          UserItemStore.emit(ActionTypes.ADD_ITEM_ERR);
        }

        break;
    case ActionTypes.GET_USER_ITEMS_RES:
        var items = action.data;
        if(items){

          _userItems = items.map(function(itemRes){
            var item = new UserItem();
            item.title = itemRes.title;
            item.description = itemRes.description;
            return item;
          });

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
