const sortBy = require('sort-array');

var postController = function(Post){

  var post = function(req, res, next){
    var newPost = new Post(req.body);
    newPost.save(function(err, newPost){
      if(err){return next(err)};
      res.status(201).send(newPost);
    });
  }

  var getList = function(req, res){

    var query = {
      // Take the supplied results per page int, or default to 5
      perPage: (req.query.perPage) ? Number(req.query.perPage) : 5,
      // Take the supplied offset, or default to 0
      offset: (req.query.offset) ? Number(req.query.perPage) : 0
    };

    // Make DB query
    Post.find()
      .lean()
      .sort({createdAt: -1})
      .limit(query.perPage)
      .skip(query.offset)
      .exec( function(err, posts, next){
        if(err){return next(err)};
        // Send the results
        res.status(200).json(posts);
      })
  }

  var getSingle = function(req, res, next){
    Post.findById(req.params.id).lean().exec(function(err, post){
      if(err){return next(err)};
      res.json(post);
    })
  }

  var deleteSingle = function(req, res, next){
    Post.findById(req.params.id).remove(function(err){
      if(err){return next(err)} else {
      res.status(200).json({message: "That post has been successfully deleted"});
      }
    })
  }

  var patchSingle = function(req, res, next){
    Post.findById(req.params.id, function(err, post){
      if(err){return next(err)};
      // Pull in any body keys that are present, and update the document
      for(var p in req.body){
        post[p] = req.body[p];
      }
      //Save the document
      post.save(function(err, updatedPost){
        if(err){return next(err)};
        res.status(201).send(updatedPost);
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
