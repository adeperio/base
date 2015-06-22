'use strict'

function Error(err, req, res, next){

  //custom error logic in here
  next(err);
}

module.exports = Error;
