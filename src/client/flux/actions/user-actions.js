'use strict';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import http from 'superagent';

module.exports = {

  getMe: function(){
    http.get('/api/v1/users/me')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Did get me: SUCCESS");

          Dispatcher.handleServerAction({
            actionType: ActionTypes.ME_RES,
            data: res.body
          });
        } else{
          console.log("Did get me: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.ME_ERR,
            data: res.error
          });
        }
      });
  }
};
