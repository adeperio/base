'use strict'
import SessionRepository from '../repos/store/SessionRepository.js';

function AuthService(strategy){
  this.strategy = strategy;
}

AuthService.prototype = {

  urlForAuthentication: function(email) {
      return this.strategy.urlForAuthentication(email);
  },

  exchangeCodeForToken: function(code){
      return this.strategy.exchangeCodeForToken(code);
  },

  revoke: function(session){

    return this.strategy.revoke(session) //revoke strategy access
                  .then(function(){

                    //now revoke application access
                    var sessionRepo = new SessionRepository();
                    return sessionRepo.deleteSession(session.base_access_token);
                  })
                  .catch(function(e){
                    throw new Error('Error revoking access');
                  });
  }
}

module.exports = AuthService;
