var jwt = require('jwt-simple');

var userController = function(User){

  // LIST EXISTING USERS
  // GET a list of all existing users
  var getList = function(req, res){
    // Blank query
    var query = {};
    // Make the list filterable by id, email and display name
    if (req.query._id) {
      query._id = req.query._id;
    }
    if (req.query._id) {
      query._id = req.query._id;
    }
    if (req.query.email) {
      query.email = req.query.email;
    }
    if (req.query.displayName) {
      query.displayName = req.query.displayName;
    }
    // Search the DB
    User.find(query, function(err, users){
      if(err){return next(err)};
      // Only return particular fields through the API, not the user's admin role
      res.status(200).json(users.map(function(user){
        return {
          _id: user._id,
          email: user.email,
          displayname: user.displayName,
          image: user.image,
          programme: user.programme,
          admin: user.admin
        }
      }))
    })
  }

  var getMe = function(req, res, next){
    // Take the token passed by the user and decode it to pull out the supplied user ID
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.JWT_SECRET, function(err){
      if(err) return res.status(401).json({message: "You are not authorised to access this resource."})
    });
    var userId = payload.sub;
    // Search for and return the user with the specified ID
    User.findById(userId).lean().exec(function(err, user){
      if(err){return next(err)};
      res.send(user);
    })
  }

  var getSingle = function(req, res, next){
    User.findById(req.params.id).lean().exec(function(err, user){
      if(err){return next(err)};
      res.json(user);
    })
  }

  var patchSingle = function(req, res, next){
    User.findById(req.params.id, function(err, user){
      if(err){return next(err)};
      // Do not allow user to make themselves admin
      if(req.body.admin){
        delete req.body.admin;
      }
      // Pull in any body keys that are present, and update the document
      for(var p in req.body){
        user[p] = req.body[p];
      }
      //Save the document
      user.save(function(err, updatedUser){
        console.log(updatedUser)
        if(err){return next(err)};
        res.status(201).send(updatedUser);
      });
    })
  }

  // Expose methods
  return {
    getList: getList,
    getMe: getMe,
    getSingle: getSingle,
    patchSingle: patchSingle
  }

}

module.exports = userController;
