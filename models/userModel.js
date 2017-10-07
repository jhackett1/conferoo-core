var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each user stored in the database
var userModel = new Schema({
  email: String,
  googleId: String,
  displayName: String,
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});


module.exports = mongoose.model('User', userModel);
