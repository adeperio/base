'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';

module.exports = {

  setSessionObject: function(sessionObject){
    Dispatcher.handleViewAction({
      actionType: ActionTypes.SESSION_OBJECT_REC,
      data: sessionObject
    });
  },

  revoke: function(sessionObject){

    http.get('/revoke')
      .accept('application/json')
      .set('Authorization', 'Bearer ' + sessionObject.base_access_token)
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
