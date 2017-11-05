// Media upload route

var express = require('express');
// Import model
var Media = require('../models/mediaModel');
var authorise = require('../services/authoriser.js');
// var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' });

var routes = function(app){

  var router = express.Router();
  var mediaController = require('../controllers/mediaController')(Media);

  router.route('/')
    .get(mediaController.get)
    //POST a new media upload to the database, using multer to process
    .post(mediaController.post)

  router.route('/:id')
    // DELETE an upload by ID
    .delete(mediaController.delete)

  return router;
}

module.exports = routes;
