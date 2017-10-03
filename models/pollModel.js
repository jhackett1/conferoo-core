var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each poll stored in the database
var postModel = new Schema({
  question: {type: String},
  description: {type: String},
  options: {type: Object},
  // Is the poll open to responses?
  acceptResponses: {type: Boolean, default: true},
  // Should this be visible on the frontend?
  published: {type: Boolean, default: false}
});

module.exports = mongoose.model('Event', postModel);
