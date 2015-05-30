'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';

module.exports = {

  setAccessToken: function(accessToken){
    Dispatcher.handleViewAction({
      actionType: ActionTypes.ACCESS_TOKEN_REC,
      data: accessToken
    });
  },

  revoke: function(accessToken){

    http.get('/revoke')
      .accept('application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Did revoke: SUCCESS");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.REVOKE_RES,
            data: res.body
          });
        } else{
          console.log("Did revoke: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.REVOKE_ERR,
            data: res.error
          });
        }
      });

  }
};
