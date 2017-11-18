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
    User.findById(userId, function(err, user){
      if(err){return next(err)};
      Event.find({_id: user.agenda})
        // Sort by programme first, then by time, then themes
        .sort({programme: 1, time: 1, themes: 1})
        .exec(function (err, events) {
          if(err){return next(err)};
          for (var i = 0; i < events.length; i++) {
            events[i].attending = true;
          }
          res.status(200).send(events)
        });
    })
  }

  var add = function(req, res, next){
    // Decode a user ID from the supplied token
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return next(err);
    });
    var userId = payload.sub;
    // Search for and return the user with the specified ID
    User.findById(userId, function(err, user){
      if(err){return next(err)};
      var updatedUser = user;
      updatedUser.agenda.push(req.body.event)
      user.save(function(err, updatedUser){
        if(err){return next(err)};
        Event.find({_id: updatedUser.agenda})
          // Sort by programme first, then by time, then themes
          .sort({programme: 1, time: 1, themes: 1})
          .exec(function (err, events) {
            if(err){return next(err)};
            for (var i = 0; i < events.length; i++) {
              events[i].attending = true;
            }
            res.status(200).send(events)
          });
      });
    })
  }

  var remove = function(req, res, next){
    // Decode a user ID from the supplied token
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return next(err);
    });
    var userId = payload.sub;
    // Search for and return the user with the specified ID
    User.findById(userId, function(err, user){
      if(err){return next(err)};
      var updatedUser = user;
      var index = updatedUser.agenda.indexOf(req.body.event)
      updatedUser.agenda.splice(index, 1)
      user.save(function(err, updatedUser){
        Event.find({_id: updatedUser.agenda})
          // Sort by programme first, then by time, then themes
          .sort({programme: 1, time: 1, themes: 1})
          .exec(function (err, events) {
            if(err){return next(err)};
            for (var i = 0; i < events.length; i++) {
              events[i].attending = true;
            }
            res.status(200).send(events)
          });
      })
    })
  }

  // Expose public methods
  return {
    list: list,
    add: add,
    remove: remove
  }
}

module.exports = agendaController;
