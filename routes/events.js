var express = require('express');
var router = express.Router();

// Import model
var Event = require('../models/eventModel');

router.route('/')
  //GET Display a list of all events
  .get(function(req, res){
    // Blank query
    var query = {};
    // Make DB query
    Event.find(query, function(err, events){
      res.json(events);
    })
  })
  //POST Add a new event to the database
  .post(function(req, res){
    var newEvent = new Event(req.body);
    console.log(req.body)
    newEvent.save();
    res.status(201).send(newEvent);
    console.log('POST request made to /events endpoint')
  })



module.exports = router;
