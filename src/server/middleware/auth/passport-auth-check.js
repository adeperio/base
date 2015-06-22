'use strict'

function IsAuthenticated(req,res,next){

    if(req.isAuthenticated() && req.user){
        next();
    }else{
        res.status(401);
        next(new Error('Not Authorised'));
    }
}

module.exports = IsAuthenticated;
