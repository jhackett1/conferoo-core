var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each event stored in the database
var eventModel = new Schema({
  title: {type: String, required: true},
  speaker: {type: String, default: null},
  shortDescription: {type: String, required: true},
  longDescription: {type: String, default: null},
  duration: {type: Number, required: true},
  day: {type: String, required: true},
  time: {type: Number, required: true},
  topics: {type: Array, default: []},
  // Should this be visible on the frontend?
  published: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Event', eventModel);
