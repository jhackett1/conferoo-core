// Media upload route

var express = require('express');
// Import model
var Media = require('../models/mediaModel');
var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var mediaController = require('../controllers/mediaController')(Media);

  router.route('/')
    .get(mediaController.get)
    //POST a new media upload to the database
    .post(mediaController.post)

  return router;
}

module.exports = routes;
