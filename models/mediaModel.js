var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each piece of media uploaded to the database
var mediaModel = new Schema({
  // Get from file
  title: {type: String, required: true},
  // Get from file
  sources: {type: Object, required: true},
  s3Key: {type: String},
  // Get from now date object in controller
  uploadedAt: {type: Object, required: true}
}, { versionKey: false });

module.exports = mongoose.model('Media', mediaModel);
