var express = require('express');
var jwt = require('jsonwebtoken');
// Import model
var User = require('../models/userModel');

var routes = function(app){

  var router = express.Router();

  router.route('/')
    .post(function(req, res){

      User.findOne({
        username: req.body.username
      }, function(err, user){
        // Handle errors
        if(err) throw err;
        // Does the user exist?
        if(!user){

          res.json({
            success: 'false',
            message: 'User not found'
          })

        // If user exists but password is wrong
        } else if(user) {

          if(user.password != req.body.password){
            res.json({
              success: 'false',
              message: 'Password incorrect'
            })
          //If password and user both correct
          } else {
            // Generate token
            var token = jwt.sign({
              username: user.username,
              password: user.password
            }, app.get('secret'), {
              expiresIn: 1440
            });
            // Send back to user
            res.json({
              success: true,
              message: 'Token generated successfully.',
              token: token
            })
          }

        }
      })

    })

  return router;
}

module.exports = routes;
