'use strict';

import Dispatcher from '../core/dispatcher';
import ActionTypes from '../constants/action-types';
import https from 'superagent';

module.exports = {

  getMe: function(){
    https.get('/api/v1/users/me')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          Dispatcher.handleServerAction({ actionType: ActionTypes.ME_RES, data: res.body });

        } else{
          Dispatcher.handleServerAction({ actionType: ActionTypes.ME_ERR, data: res.error });
        }
      });
  },

  signUp: function(emailAddress, password){

    https.post('/auth/signup')
      .send({ emailAddress: emailAddress, password: password })
      .accept('application/json')
      .end((err, res) => {

        if(!err && res && !res.error) {
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNUP_RES,
            data: res.body
          });
        } else {

          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNUP_ERR,
            data: res.error
          });
        }
      });
  },

  signIn: function(emailAddress, password){

    https.get('/auth/signin')
      .send({ emailAddress: 'testme1@test.com', password: 'password' })
      .accept('application/json')
      .end((err, res) => {

        if(!err && res && !res.error) {
          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNIN_RES,
            data: res.body
          });
        } else {

          Dispatcher.handleServerAction({
            actionType: ActionTypes.SIGNIN_ERR,
            data: res.error
          });
        }
      });
  },

  signOut: function(){

    https.get('/auth/signout')
      .accept('application/json')
      .end((err, res) => {

        if(!err && !res.error) {
          Dispatcher.handleServerAction({ actionType: ActionTypes.SIGNOUT_RES, data: res.body
          });
        } else {
          Dispatcher.handleServerAction({ actionType: ActionTypes.SIGNOUT_ERR, data: res.error });
        }
      });
  },

};
