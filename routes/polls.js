var express = require('express');
// Import model
var polls = require('../models/pollModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var pollsController = require('../controllers/pollsController')(polls);

  router.route('/')
    //GET a list of all polls
    .get(pollsController.getList)
    //POST a new poll to the database
    .post(pollsController.post)

  router.route('/:id')
    //GET a single poll by ID
    .get(authorise.basic, pollsController.getSingle)
    // DELETE a single poll by ID
    .delete(authorise.admin, pollsController.deleteSingle)
    // PATCH/update a single poll by ID
    .patch(authorise.admin, pollsController.patchSingle)

  return router;
}

module.exports = routes;
