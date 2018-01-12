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
  options: {
    a: {type: String, default: null},
    b: {type: String, default: null},
    c: {type: String, default: null},
    d: {type: String, default: null}
  },
  // Collate actual responses
  responses: {
    a: {type: Array, default: null},
    b: {type: Array, default: null},
    c: {type: Array, default: null},
    d: {type: Array, default: null}
  },
  openResponses: {type: Array, default: null}
}, { versionKey: false });

module.exports = mongoose.model('poll', pollModel);
