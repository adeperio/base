'use strict'

import uuid from 'node-uuid';

//might need to replace this out with a proper implementation
function RandomizerService(){

  //Generates a random challenge token
  this.getRandomUUIDv4 = function(){
    return uuid.v4();
  }
}

module.exports = RandomizerService;
