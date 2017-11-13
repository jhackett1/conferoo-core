var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each event stored in the database
var eventModel = new Schema({
  title: {type: String, required: true},
  // Store ID of speaker
  speaker: {type: String, default: null},
  // Stores URL string
  image: {type: String, default: null},
  preview: {type: String, default: null},
  teaser: {type: String, required: true},
  content: {type: String, default: null},
  // URL to speaker's slides
  slides: {type: String, default: null},
  // Number of minutes
  duration: {type: Number, required: true},
  // Store time as string HHMM
  time: {type: String, required: true},
  programme: {type: String, required: true},
  venue: {type: String, default: false},
  // Array of strings
  themes: {type: Array, default: []},
  // String for frontend visibility
  published: {
    type: String,
    required: true,
    default: 'public'
  }
}, { versionKey: false });

module.exports = mongoose.model('Event', eventModel);
