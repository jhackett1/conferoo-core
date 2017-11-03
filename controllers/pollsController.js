const sortBy = require('sort-array');

var pollsController = function(Poll){

  var post = function(req, res, next){
    var newPoll = new Poll(req.body);
    newPoll.save(function(err, newPoll){
      if(err){return next(err)};
      res.status(201).send(newPoll);
    });
  }

  var getList = function(req, res){
    // Blank query
    var query = {};
    // Make the list queryable by day, time and poll
    // Make DB query
    Poll.find(query).sort({createdAt: -1}).exec( function(err, polls, next){
      if(err){return next(err)};
      // Send the results
      res.status(200).json(polls);
    })
  }

  var getSingle = function(req, res, next){
    Poll.findById(req.params.id, function(err, poll){
      if(err){return next(err)};
      res.json(poll);
    })
  }

  var deleteSingle = function(req, res, next){
    Poll.findById(req.params.id).remove(function(err){
      if(err){return next(err)} else {
      res.status(200).json({message: "That poll has been successfully deleted"});
      }
    })
  }

  var patchSingle = function(req, res, next){
    Poll.findById(req.params.id, function(err, poll){
      if(err){return next(err)};
      // Pull in any body keys that are present, and update the document
      for(var p in req.body){
        poll[p] = req.body[p];
      }
      //Save the document
      poll.save(function(err, updatedPoll){
        if(err){return next(err)};
        res.status(201).send(updatedPoll);
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

module.exports = pollsController;
