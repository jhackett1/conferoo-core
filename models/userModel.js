var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

// Schema for each user stored in the database
var userModel = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  schedule: {
    type: Object
  }
});

userModel.pre('save', function(next){
  // Get the user document which is being saved
  var user = this;
  // Check whether the password is actually modified. If not, don't do anything
  if(!user.isModified('password')) return next();
  // Use bcrypt to generate a salt, hash the password and save that rather than the plaintext
  bcrypt.genSalt(10, function(err, salt){
    if(err) return err;
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return err;
      user.password = hash;
    })
  })
})

module.exports = mongoose.model('User', userModel);
