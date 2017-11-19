var jwt = require('jwt-simple');

var eventController = function(Event, User){

  var post = function(req, res, next){
    var newEvent = new Event(req.body);
    newEvent.save(function(err, newEvent){
      if(err){return next(err)};
      res.status(201).send(newEvent);
    });
  }

  var getList = function(req, res, next){
    // Blank query
    var query = {};
    // Make the list filterable by programme, speaker, theme and venue
    if (req.query.programme) {
      query.programme = req.query.programme;
    }
    if (req.query.speaker) {
      query.speaker = req.query.speaker;
    }
    if (req.query.venue) {
      query.venue = req.query.venue;
    }
    if (req.query.themes) {
      query.themes = req.query.themes;
    }
    // Make DB query
    Event.find(query)
      // Sort by time
      .sort({time: 1})
      .lean()
      .exec( function(err, events, next){
        if(err){return next(err)};
        // Send response
        res.json(events);
      })
  }

  var getSingle = function(req, res, next){
    Event.findById(req.params.id).lean().exec(function(err, event){
      if(err){return next(err)};
      // Send response
      res.json(event);
    })
  }

  var deleteSingle = function(req, res, next){
    Event.findById(req.params.id).remove(function(err){
      if(err){return next(err)} else {
      res.status(200).json({message: "That event has been successfully deleted"});
      }
    })
  }

  var patchSingle = function(req, res, next){
    Event.findById(req.params.id, function(err, event){
      if(err){return next(err)};
      // Pull in any body keys that are present, and update the document
      for(var p in req.body){
        event[p] = req.body[p];
      }
      //Save the document
      event.save(function(err, updatedEvent){
        if(err){return next(err)};
        res.status(201).send(updatedEvent);
      });
    })
  }

  // Expose public methods
  return {
    post: post,
    getList: getList,
    getSingle: getSingle,
    deleteSingle: deleteSingle,
    patchSingle: patchSingle
  }

}

module.exports = eventController;
