'use strict';

import React from 'react';
import Router from 'react-router';
import routes from './routes.js';
import Session from './flux/models/session.js';

var _globalSession = new Session();

window.setSessionGlobal = function (accessToken, emailAddress){
  _globalSession.accessToken = accessToken;
  _globalSession.emailAddress = emailAddress;
}

window.getSessionGlobal = function (){
  return _globalSession;
}

function run() {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(run);
