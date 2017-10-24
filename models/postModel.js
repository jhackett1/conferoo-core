var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each blog post stored in the database
var postModel = new Schema({
  title: {type: String, required: true},
  image: {type: String, default: null},
  teaser: {type: String, required: true},
  content: {type: String, default: null},
  author: {type: String, required: true},
  // Should this be visible on the frontend?
  published: {
    type: Boolean,
    required: true,
    default: false
  }
}, { versionKey: false });

module.exports = mongoose.model('Post', postModel);
