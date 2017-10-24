var express = require('express');
// Import model
var Event = require('../models/eventModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var eventController = require('../controllers/eventsController')(Event);

  router.route('/')
    //GET a list of all events
    .get(eventController.getList)
    //POST a new event to the database
    .post(authorise.admin, eventController.post)

  router.route('/:id')
    //GET a single event by ID
    .get(authorise.basic, eventController.getSingle)
    // DELETE a single event by ID
    .delete(authorise.admin, eventController.deleteSingle)
    // PATCH/update a single event by ID
    .patch(authorise.admin, eventController.patchSingle)

  return router;
}

module.exports = routes;
