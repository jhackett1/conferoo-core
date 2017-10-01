var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each blog post stored in the database
var postModel = new Schema({
  title: {type: String},
  author: {type: String},
  excerpt: {type: String},
  content: {type: String},
  publishedDate: {type: Number},
  publishedTime: {type: Number},
  topics: {type: Array},
  // Should this be visible on the frontend?
  published: {type: Boolean, default: false}
});

module.exports = mongoose.model('Event', postModel);
