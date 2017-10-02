var express = require('express');
// Import model
var Event = require('../models/eventModel');

var routes = function(app){

  var router = express.Router();

  router.route('/')

    //GET a list of all events
    .get(function(req, res){
      // Blank query
      var query = {};
      // Make the list queryable by day, time and speaker
      if (req.query.day) {
        query.day = req.query.day;
      }
      if (req.query.time) {
        query.time = req.query.time;
      }
      if (req.query.speaker) {
        query.speaker = req.query.speaker;
      }
      // Make DB query
      Event.find(query, function(err, events){
        res.json(events);
      })
    })

    //POST a new event to the database
    .post(function(req, res){
      // As long as the event has a title, day, time and duration supplied, save it to the database
      if(req.body.title && req.body.duration && req.body.day && req.body.time){
        var newEvent = new Event(req.body);
        console.log(req.body)
        newEvent.save();
        res.status(201).send(newEvent);
      } else {
        res.status(400).send("All new events require a title, duration, day and time");
      }
    })

  return router;
}

module.exports = routes;
