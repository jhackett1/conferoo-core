var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');

var authController = function(User){

  // Create a JWT and send it as a response
  function createSendToken(user, req, res){
    // Create an expiration date two days from now
    var expires = moment().add('minutes', 2).valueOf();
    // Process the claims of the token, with an expiration date
    var payload = {
      iss: req.hostname,
      sub: user.id,
      exp: expires
    }
    // Encode the token, signing it with the secret
    var token = jwt.encode(payload, process.env.JWT_SECRET);
    // Send the token to the client
    res.status(200).json({
      user: user,
      token: token
    })
  }

  // Move through the Google Oauth flow
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

          // Check that the user is authenticating from the correct G Suite org or a subdomain
          var whitelistedDomain = "faststream.civilservice.gov.uk";
          if(!profile.domain.endsWith(whitelistedDomain)){
            return res.status(401).json({message: `You must sign in with a @${whitelistedDomain} account`})
          }

          // Let's check whether we have an existing user with this profile info
          User.findOne({
            googleId: profile.id
          }, function(err, foundUser){
            // Does the user exist? If so, send a JWT to the client
            if(foundUser){
              return createSendToken(foundUser, req, res);
            }
            // If not, save the new user, then send a JWT to the client
            var newUser = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value
            });
            newUser.save(function(err, user){
              if(err) return console.log(err);
              return createSendToken(user, req, res)
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
