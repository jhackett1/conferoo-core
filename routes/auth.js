var express = require('express');
// Import model
var User = require('../models/userModel');

var routes = function(app){

  var router = express.Router();
  var authController = require('../controllers/authController')(User);

  router.route('/')
    // LOG IN EXISTING USER
    // POST new user to the database
    .post(authController.authenticate);
  return router;
}

module.exports = routes;
