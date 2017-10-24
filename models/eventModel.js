var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each event stored in the database
var eventModel = new Schema({
  title: {type: String, required: true},
  speaker: {type: String, default: null},
  image: {type: String, default: null},
  teaser: {type: String, required: true},
  content: {type: String, default: null},
  duration: {type: Number, required: true},
  date: {type: Object, required: true},
  topics: {type: Array, default: []},
  // Should this be visible on the frontend?
  published: {
    type: Boolean,
    required: true,
    default: false
  }
}, { versionKey: false });

module.exports = mongoose.model('Event', eventModel);
