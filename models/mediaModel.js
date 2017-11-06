var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each piece of media uploaded to the database
var mediaModel = new Schema({
  // Filename from original upload
  title: {type: String, required: true},
  // Save the S3 URLs, constructed from the host URL in config and their Keys
  sources: {type: Object, required: true},
  // From new Date() object in upload route
  uploadedAt: {type: Date, required: true}
}, { versionKey: false });

module.exports = mongoose.model('Media', mediaModel);
