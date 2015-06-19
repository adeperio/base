'use strict';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import http from 'superagent';

module.exports = {

  getMe: function(){
    http.get('/api/v1/me')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Did get me: SUCCESS " + JSON.stringify(res.body));

          Dispatcher.handleServerAction({
            actionType: ActionTypes.ME_RES,
            data: res.body
          });
        } else{
          console.log("Did get me: ERROR" + JSON.stringify(res));
          Dispatcher.handleServerAction({
            actionType: ActionTypes.ME_ERR,
            data: res.error
          });
        }
      });
  }
};
