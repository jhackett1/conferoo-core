var express = require('express');
// Import model
var Event = require('../models/eventModel');

var routes = function(app){

  var router = express.Router();
  var eventController = require('../controllers/eventsController')(Event);


  router.route('/')
    //GET a list of all events
    .get(eventController.get)
    //POST a new event to the database
    .post(eventController.post)

  return router;
}

module.exports = routes;
