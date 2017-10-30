var express = require('express');
// Import model
var posts = require('../models/postsModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var postsController = require('../controllers/postsController')(posts);

  router.route('/')
    //GET a list of all postss
    .get(postsController.getList)
    //POST a new user to the database
    .post(postsController.post)

  router.route('/:id')
    //GET a single posts by ID
    .get(postsController.getSingle)
    // DELETE a single posts by ID
    .delete(postsController.deleteSingle)
    // PATCH/update a single posts by ID
    .patch(postsController.patchSingle)

  return router;
}

module.exports = routes;
