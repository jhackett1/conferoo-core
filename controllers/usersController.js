var userController = function(User){

  var get = function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);
      res.json(users);
    })
  }

  // REGISTER
  // Add new user to the database
  var post = function(req, res){

    console.log('testing')

    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err, user) {
      if (err) res.send(err);
      res.status(200).json({
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
