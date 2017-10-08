// USE THIS MODULE TO PROTECT AN API ROUTE FROM UNAUTHENTICATED USERS

var jwt = require('jwt-simple');


// Auth method that allows a request to modify only a user's own profile, based on a comparison of their JWT payload and the requested resouce
module.exports.userProfile = function(req, res, next){
    // Are there headers?
    if(!req.headers.authorization) return res.status(401).json({message: "You are not authorised to access this resource."});
    // Decode the token using the secret
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return res.status(401).json({message: "You are not authorised to access this resource."})
    });
    // Is the token valid?
    if(!payload.sub) return res.status(401).json({message: "You are not authorised to access this resource."});
    if(!payload.exp || payload.exp <= Date.now()) return res.status(401).json({message: "You are not authorised to access this resource."});
    // Now, let's check if the user ID in the request matches that the token was issued to
    if(req.params.id !== payload.sub)  return res.status(401).json({message: "You are not authorised to access this resource."});
    // We're good, so let the request proceed to the route
    return next();
  }

module.exports.basic = function(req, res, next){
    // Are there headers?
    if(!req.headers.authorization) return res.status(401).json({message: "You are not authorised to access this resource."});
    // Decode the token using the secret
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return res.status(401).json({message: "You are not authorised to access this resource."})
    });
    // Is the token valid?
    if(!payload.sub) return res.status(401).json({message: "You are not authorised to access this resource."});
    if(!payload.exp || payload.exp <= Date.now()) return res.status(401).json({message: "You are not authorised to access this resource."});
    // We're good, so let the request proceed to the route
    return next();
  }

module.exports.admin = function(req, res, next){
    // Are there headers?
    if(!req.headers.authorization) return res.status(401).json({message: "You are not authorised to access this resource."});
    // Decode the token using the secret
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return res.status(401).json({message: "You are not authorised to access this resource."})
    });
    // Is the token valid?
    if(!payload.sub) return res.status(401).json({message: "You are not authorised to access this resource."});
    if(!payload.exp || payload.exp <= Date.now()) return res.status(401).json({message: "You are not authorised to access this resource."});
    // Check whether the user is admin
    if(!payload.admin || payload.admin == false) return res.status(401).json({message: "You are not authorised to access this resource."});
    // We're good, so let the request proceed to the route
    return next();
  }
