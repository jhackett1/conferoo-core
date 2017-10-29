const sortBy = require('sort-array');

var speakerController = function(Speaker){

  var post = function(req, res, next){
    var newSpeaker = new Speaker(req.body);
    newSpeaker.save(function(err, newSpeaker){
      if(err){return next(err)};
      res.status(201).send(newSpeaker);
    });
  }

  var getList = function(req, res){
    // Blank query
    var query = {};
    // Make the list queryable by day, time and speaker
    if (req.query.date) {
      query.day = req.query.day;
    }
    if (req.query.speaker) {
      query.speaker = req.query.speaker;
    }
    // Make DB query
    Speaker.find(query).exec( function(err, speakers, next){
      if(err){return next(err)};
      var speakers = speakers.map(function(speaker){
        // Add on an internal link

        // TODO Work out why this isn't being passed into the response

        speaker.detail = req.protocol + "://" + req.get('host') + req.originalUrl + "/" + speaker.id;
        return speaker;
      })
      // Sort the results by whichever query parameter is passed in
      if(req.query.sort){
        sortBy(speakers, req.query.sort);
      }
      // Send the results
      res.status(200).json(speakers);
    })
  }

  var getSingle = function(req, res, next){
    Speaker.findById(req.params.id, function(err, speaker){
      if(err){return next(err)};
      res.json(speaker);
    })
  }

  var deleteSingle = function(req, res, next){
    Speaker.findById(req.params.id).remove(function(err){
      if(err){return next(err)} else {
      res.status(200).json({message: "That speaker has been successfully deleted"});
      }
    })
  }

  var patchSingle = function(req, res, next){
    Speaker.findById(req.params.id, function(err, speaker){
      if(err){return next(err)};
      // Pull in any body keys that are present, and update the document
      for(var p in req.body){
        speaker[p] = req.body[p];
      }
      //Save the document
      speaker.save(function(err, updatedSpeaker){
        if(err){return next(err)};
        res.status(201).send(updatedSpeaker);
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

module.exports = speakerController;
