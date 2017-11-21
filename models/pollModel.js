var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each poll stored in the database
var pollModel = new Schema({
  // Title of the blog post
  question: {type: String, required: true},
  // Some explanation of the question
  detail: {type: String, default: null},
  // Store whether poll is multiple choice or open, WITH validation
  type: {
    type: String,
    required: ['multiple', 'open'],
  },
  // Creation time
  createdAt: {type: String, required: true},
  // Array of tags/themes
  themes: {type: Array, default: null},
  // Is the poll accepting responses?
  published: {type: String, required: ['private', 'active', 'inactive']},
  // Possible responses in an array
  options: {type: Object, default: null},
  // Collate actual responses
  responses: {type: Object, default: false}
}, { versionKey: false });

module.exports = mongoose.model('poll', pollModel);
