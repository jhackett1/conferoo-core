// statusController

var express = require('express');

// Import models
var Media = require('../models/mediaModel');
var Post = require('../models/postsModel');
var Event = require('../models/eventModel');
var Speaker = require('../models/speakerModel');
var User = require('../models/userModel');

var authorise = require('../services/authoriser.js');

var routes = function(app){

  var router = express.Router();
  var statusController = require('../controllers/statusController')(Media, Post, Event, Speaker, User);

  router.route('/')
    .get(statusController.get)

  return router;
}

module.exports = routes;
