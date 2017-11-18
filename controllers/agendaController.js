var jwt = require('jwt-simple');

var agendaController = function(User, Event){

  var list = function(req, res, next){
    // Decode a user ID from the supplied token
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return next(err);
    });
    var userId = payload.sub;
    // Search for and return the user with the specified ID
    User.findById(userId).lean().exec(function(err, user){
      if(err) return next(err);
      res.status(200).send(user.agenda)
    })
  }

  var update = function(req, res, next){
    // Decode a user ID from the supplied token
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return next(err);
    });
    var userId = payload.sub;
    // Search for and return the user with the specified ID
    User.findById(userId).exec(function(err, user){
      if(err) return next(err);
      // Replace the existing agenda with the one in the request body
      user.agenda = req.body;
      // And save back to the database
      user.save(function(err, updatedUser){
        if(err){return next(err)};
        res.status(200).send(updatedUser.agenda)
      })

    })
  }

  // Expose public methods
  return {
    list: list,
    update: update
  }
}

module.exports = agendaController;
