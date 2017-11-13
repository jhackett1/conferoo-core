var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema for each user stored in the database
var userModel = new Schema({
  email: String,
  googleId: String,
  displayName: String,
  image: String,
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  // Which programme is this person attending? They can update this manually
  programme: { type: String, default: '0'},
  // Keep track of the events the user has expressed interest in
  agenda: {type: Array, default: [] },
  // Bool keeping track of whether user has seen onboarding content
  onboarded: {type: Boolean, default: false }
}, { versionKey: false });


module.exports = mongoose.model('User', userModel);
