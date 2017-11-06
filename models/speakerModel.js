var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each event stored in the database
var speakerModel = new Schema({
  name: {type: String, required: true},
  biography: {type: String, default: null},
  // Stores URL string
  image: {type: String, default: null},
  preview: {type: String, default: null},
}, { versionKey: false });

module.exports = mongoose.model('Speaker', speakerModel);
