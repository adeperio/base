'use strict'

function IsAuthenticated(req,res,next){
    if(req.isAuthenticated() && req.user){
        next();
    }else{
        next(new Error(401));
    }
}

module.exports = IsAuthenticated;
