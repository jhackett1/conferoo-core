var userController = function(User){

  // LIST EXISTING USERS
  // GET a list of all existing users
  var list = function(req, res){
    User.find(function(err, users){
      if (err) console.log(err);
      // Only return particular fields through the API, not including the password hash
      res.status(200).json(users.map(function(user){
        return {
          id: user._id,
          username: user.username
        }
      }))
    })
  }

  // Expose methods
  return {
    list: list
  }

}

module.exports = userController;
