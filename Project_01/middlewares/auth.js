const {getUser} = require ("../service/auth");

function checkAuthentication (req,res,next){
    const tokencookie = req.cookies?.token; // dot is vvv imp
    req.user = null;

    if (!tokencookie){
        return next();
    }
    const user = getUser (tokencookie);
    if (user){
        req.user = user;
    }
    return next();
}

function restrictTo (roles=[]){
    return function (req,res,next){
        if (!req.user){
            return res.redirect ("/login");
        }
        if (!roles.includes(req.user.role)){
            return res.end ("YOU ARE UNAUTHORIZED");
        }
        return next();
    }
}
module.exports = {
    checkAuthentication,
    restrictTo,
};