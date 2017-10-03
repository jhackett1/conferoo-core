var express = require('express');
// Import model
var User = require('../models/userModel');

var routes = function(app){
  var router = express.Router();
  var userController = require('../controllers/usersController')(User);


  router.route('/')
    //GET a list of all events
    .get(userController.get)
    //POST a new event to the database
    .post(userController.post)


  return router;
}

module.exports = routes;
