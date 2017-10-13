var express = require('express');
// Import model
var User = require('../models/userModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var userController = require('../controllers/usersController')(User);

  router.route('/')
      // LIST EXISTING USERS
      // GET a list of all existing users
      .get(authorise.basic, userController.getList)

  router.route('/:id')
      // GET a list of one existing user
      .get(authorise.basic, userController.getSingle)
      // PATCH an existing user with updated info
      .patch(authorise.userProfile, userController.patchSingle)

  return router;
}

module.exports = routes;
