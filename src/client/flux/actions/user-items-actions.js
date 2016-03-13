'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/action-types';
import https from 'superagent';

module.exports = {

  addItem: function(title, description){

    https.post('/api/v1/users/me/items')
      .send([{ title: title, description: description }])
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Add item: SUCCESS");
          this.getUserItems();

          Dispatcher.handleServerAction({
            actionType: ActionTypes.ADD_ITEM_RES,
            data: res.body
          });
        } else{
          console.log("Add item: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.ADD_ITEM_ERR,
            data: res.error
          });
        }
      });
  },

  getUserItems: function(){

    https.get('/api/v1/users/me/items')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Get user items: SUCCESS");

          Dispatcher.handleServerAction({
            actionType: ActionTypes.GET_USER_ITEMS_RES,
            data: res.body
          });
        } else{
          console.log("Get user items: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.GET_USER_ITEMS_ERR,
            data: res.error
          });
        }
      });
  },

};
