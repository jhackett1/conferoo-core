const sortBy = require('sort-array');

var eventController = function(Event){

  var post = function(req, res, next){
    var newEvent = new Event(req.body);
    newEvent.save(function(err, newEvent){
      if(err){return next(err)};
      res.status(201).send(newEvent);
    });
  }

  var getList = function(req, res){
    // Blank query
    var query = {};
    // Make the list queryable by day, time and speaker
    if (req.query.day) {
      query.day = req.query.day;
    }
    if (req.query.time) {
      query.time = req.query.time;
    }
    if (req.query.speaker) {
      query.speaker = req.query.speaker;
    }
    // Make DB query
    Event.find(query).exec( function(err, events, next){
      if(err){return next(err)};
      var events = events.map(function(event){
        // Add on an internal link

        // TODO Work out why this isn't being passed into the response

        event.detail = req.protocol + "://" + req.get('host') + req.originalUrl + "/" + event.id;
        return event;
      })
      // Sort the results by whichever query parameter is passed in
      if(req.query.sort){
        sortBy(events, req.query.sort);
      }
      // Send the results
      res.status(200).json(events);
    })
  }

  var getSingle = function(req, res, next){
    Event.findById(req.params.id, function(err, event){
      if(err){return next(err)};
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
