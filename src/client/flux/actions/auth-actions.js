'use strict';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import http from 'superagent';

module.exports = {

  signOut: function(session){

    http.get('/auth/signout')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Did signout: SUCCESS");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.REVOKE_RES,
            data: res.body
          });
        } else {
          console.log("Did signout: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.REVOKE_ERR,
            data: res.error
          });
        }
      });
  },

  signUp: function(session, firstName, lastName, emailAddress){

    http.get('/auth/signup?firstName=' + firstName + '&lastName=' + lastName + '&emailAddress=' + emailAddress)
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Did signup: SUCCESS");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNUP_RES,
            data: res.body
          });
        } else{
          console.log("Did signup: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNUP_ERR,
            data: res.error
          });
        }
      });
  }
};
