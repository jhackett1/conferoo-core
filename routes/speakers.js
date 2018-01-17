var express = require('express');
// Import model
var Speaker = require('../models/speakerModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var speakerController = require('../controllers/speakerController')(Speaker);

  router.route('/')
    //GET a list of all speakers
    .get(speakerController.getList)
    //POST a new user to the database
    .post(authorise.admin, speakerController.post)

  router.route('/:id')
    //GET a single speaker by ID
    .get(authorise.basic, speakerController.getSingle)
    // DELETE a single speaker by ID
    .delete(authorise.admin, speakerController.deleteSingle)
    // PATCH/update a single speaker by ID
    .patch(authorise.admin, speakerController.patchSingle)

  return router;
}

module.exports = routes;
