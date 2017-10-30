var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each event stored in the database
var postModel = new Schema({
  // Title of the blog post
  title: {type: String, required: true},
  teaser: {type: String, required: true},
  content: {type: String, required: true},
  // Store date of creation
  createdAt: {type: Date, required: true},
  // Array of tags/themes
  themes: {type: Array, default: null},
  // Store the ID of a speaker associated with the post
  author: {type: String, default: null},
  // The URL of a featured image
  image: {type: String, required: true},
  // Post visibility 
  published: {type: String, default: false}
}, { versionKey: false });

module.exports = mongoose.model('post', postModel);
