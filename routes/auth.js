var express = require('express');
// Import model
var User = require('../models/userModel');

var routes = function(app){
  var router = express.Router();


  router.route('/')
    .post(function(req, res){
    })


  return router;
}

module.exports = routes;
