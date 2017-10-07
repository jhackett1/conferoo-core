// USE THIS MODULE TO PROTECT AN API ROUTE FROM UNAUTHENTICATED USERS
// IT...
// 1. Checks for authorisation headers
// 2. Decodes the token in the headers
// 3. Checks that the token contains claims, and has not expired

module.exports = function(req, res, next){

  var jwt = require('jwt-simple');

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
  next();
}
