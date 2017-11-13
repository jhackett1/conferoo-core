const sortBy = require('sort-array');

var speakerController = function(Speaker){

  var post = function(req, res, next){
    var newSpeaker = new Speaker(req.body);
    newSpeaker.save(function(err, newSpeaker){
      console.log("======================================",err);
      if(err){return next(err)};

      res.status(201).send(newSpeaker);
    });
  }

  var getList = function(req, res){
    // Blank query
    var query = {};
    // Make DB query
    Speaker.find(query).sort({name: 1}).lean().exec( function(err, speakers, next){
      if(err){return next(err)};
      // Send the results
      res.status(200).json(speakers);
    })
  }

  var getSingle = function(req, res, next){
    Speaker.findById(req.params.id).lean().exec(function(err, speaker){
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
