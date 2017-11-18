var express = require('express');
// Import model
var User = require('../models/userModel');
var Event = require('../models/eventModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){
  var router = express.Router();
  var agendaController = require('../controllers/agendaController')(User, Event);

  router.route('/')
      // List the user's agenda
      .get(authorise.basic, agendaController.list)
      // Add a new event to the user's agenda
      .put(authorise.basic, agendaController.update)

  return router;
}

module.exports = routes;
