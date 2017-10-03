var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

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
//
// // Before each user is saved, do this
// userModel.pre('save', function(done){
//   var user = this;
//   // Only proceed if the password has been changed
//   if(!user.isModified('password')) return done();
//   // Create a salt
//   bcrypt.genSalt(5, function(err, salt){
//     if(err) return done(err);
//     // Still here? Hash the password with the salt we got
//     bcrypt.hash(user.password, salt, null, function(err, hash){
//       if(err) return done(err);
//       // Save the hash to the user object, for saving to the DB
//       user.password = hash;
//       // We're done
//       done();
//     });
//   });
// });
//
// // Compare supplied password with stored hash
// userModel.methods.verifyPassword = function(password, done){
//   bcrypt.compare(password, this.password, function(err, isMatch){
//     if(err) return done(err);
//     done(null, isMatch);
//   });
// };

module.exports = mongoose.model('User', userModel);
