var userController = function(User){

  var get = function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);
      res.json(users);
    })
  }

  // Add new user to the database
  var post = function(req, res){
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    console.log(newUser)

    newUser.save(function(err, user) {
      if (err) res.send(err);
      res.json({
        message: 'New user added',
        user: user
      });
    });

  }

  return {
    post: post,
    get: get
  }

}

module.exports = userController;
