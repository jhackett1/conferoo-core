var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each event stored in the database
var pageModel = new Schema({
  // Title of the blog post
  title: {type: String, required: true},
  content: {type: String, required: true},
  // Post visibility
  published: {type: String, default: false}
}, { versionKey: false });

module.exports = mongoose.model('page', pageModel);
