var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each user stored in the database
var userModel = new Schema({
  username: {type: String},
  password: {type: String},
  admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userModel);
