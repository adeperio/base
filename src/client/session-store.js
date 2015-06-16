'use strict'

import Session from './flux/models/session.js';

(function(){
  var _globalSession = new Session();

  window.setSessionGlobal = function (accessToken, emailAddress){
    _globalSession.accessToken = accessToken;
    _globalSession.emailAddress = emailAddress;
  }

  window.getSessionGlobal = function (){
    return _globalSession;
  }

})();
