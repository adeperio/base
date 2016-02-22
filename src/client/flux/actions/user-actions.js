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
  },

  signUp: function(emailAddress, password){


    http.post('/auth/signup')
      .send({ emailAddress: emailAddress, password: password })
      .accept('application/json')
      .end((err, res) => {
        console.log('Signup response received...');
        if(!err && res && !res.error) {
          console.log("Did sign up: SUCCESS");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNUP_RES,
            data: res.body
          });
        } else {

          console.log("Did sign up: ERROR: " + JSON.stringify(res.error));
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNUP_ERR,
            data: res.error
          });
        }
      });
  },

  signOut: function(){

    http.get('/auth/signout')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          console.log("Did signout: SUCCESS");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNOUT_RES,
            data: res.body
          });
        } else {
          console.log("Did signout: ERROR");
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNOUT_ERR,
            data: res.error
          });
        }
      });
  },





};
