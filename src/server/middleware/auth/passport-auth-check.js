'use strict'

function IsAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        next(new Error(401));
    }
}

module.exports = IsAuthenticated;
