var request = require('request');

var authController = function(User){

  // LOG IN USER
  // POST the logged in user
  var authenticate = function(req, res){

      var url = 'https://accounts.google.com/o/oauth2/token'
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: "authorization_code"
      };

      // Trade the access code recieved from the frontend for a token
      request.post(url, {
        json: true,
        form: params
      }, function(err, response, token){
        // Once we have the token, make a further request for user profile info
        var accessToken = token.access_token;
        var headers = {
          Authorization: "Bearer " + accessToken
        };
        var apiUrl = 'https://www.googleapis.com/plus/v1/people/me';

        request.get(apiUrl, {
          json: true,
          headers: headers
        }, function(err, response, profile){
          // Let's check whether we have an existing user with this profile info
          User.findOne({
            googleId: profile.id
          }, function(err, foundUser){
            // Does the user exist? If so, send a JWT to the client
            if(foundUser){
              res.status(200).json({"message":"User found"});
              return console.log(foundUser);
            }
            // If not, save the new user, then send a JWT to the client
            var newUser = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value
            });
            newUser.save(function(err){
              if(err) return console.log(err);
              res.status(201).json({"message":"New user created"})
            })
          })
        })
      });
  }

  // Expose methods
  return {
    authenticate: authenticate
  }

}

module.exports = authController;
