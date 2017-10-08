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
  },
  // Which conference is this person attending? They can update this manually
  attending: {
    type: String,
    required: true,
    default: '0'
  },
  // Keep track of the user's personal schedule for the conference in an object
  schedule: {type: Object}
});


module.exports = mongoose.model('User', userModel);
