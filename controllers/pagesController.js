const sortBy = require('sort-array');

var postController = function(Page){

  var post = function(req, res, next){
    var newPage = new Page(req.body);
    newPage.save(function(err, newPage){
      if(err){return next(err)};
      res.status(201).send(newPage);
    });
  }

  var getList = function(req, res){

    var query = {
      // Take the supplied results per page int, or default to 5
      perPage: (req.query.perPage) ? Number(req.query.perPage) : 10,
      // Take the supplied offset, or default to 0
      offset: (req.query.offset) ? Number(req.query.perPage) : 0
    };

    // Make DB query
    Page.find()
      .lean()
      .sort({title: 1})
      .limit(query.perPage)
      .skip(query.offset)
      .exec( function(err, pages, next){
        if(err){return next(err)};
        // Send the results
        res.status(200).json(pages);
      })
  }

  var getSingle = function(req, res, next){
    Page.findById(req.params.id).lean().exec(function(err, page){
      if(err){return next(err)};
      res.json(page);
    })
  }

  var deleteSingle = function(req, res, next){
    Page.findById(req.params.id).remove(function(err){
      if(err){return next(err)} else {
      res.status(200).json({message: "That page has been successfully deleted"});
      }
    })
  }

  var patchSingle = function(req, res, next){
    Page.findById(req.params.id, function(err, page){
      if(err){return next(err)};
      // Pull in any body keys that are present, and update the document
      for(var p in req.body){
        page[p] = req.body[p];
      }
      //Save the document
      page.save(function(err, updatedPage){
        if(err){return next(err)};
        res.status(201).send(updatedPage);
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

module.exports = postController;
