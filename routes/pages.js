var express = require('express');
// Import model
var pages = require('../models/pagesModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var pagesController = require('../controllers/pagesController')(pages);

  router.route('/')
    //GET a list of all pagess
    .get(authorise.basic, pagesController.getList)
    //POST a new user to the database
    .post(authorise.admin, pagesController.post)

  router.route('/:id')
    //GET a single pages by ID
    .get(authorise.basic, pagesController.getSingle)
    // DELETE a single pages by ID
    .delete(authorise.admin, pagesController.deleteSingle)
    // PATCH/update a single pages by ID
    .patch(authorise.admin, pagesController.patchSingle)

  return router;
}

module.exports = routes;
