var crypto = require('crypto');

// Generate a JWT using a payload and secret
exports.encode = function(payload, secret){
  algorithm = 'HS256';
  var header = {
    typ: 'JWT',
    alg: algorithm
  }
  var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
  jwt += "." + sign(jwt, secret);
  return jwt;
}

// Take a string and return the base64 equivalent
function base64Encode(str){
  return new Buffer(str).toString('base64');
}

// Use the secret to add a signature to the token.
function sign(str, key){
  return crypto.createHmac('sha256', key).update(str).diget('base64');
}


exports.decode = function(token, secret){
  var segments = token.split('.');
  if(segments !== 3){
    throw new Err("Badly formed token");
  }
  var header = JSON.parse(base64Decode(segments[0]));
  var payload = JSON.parse(base64Decode(segments[1]));
  var signature = segments[0] + '.' + segments[1];

  if(!verify(signature, secret, segments[2])){
    throw new Err("Signature doesn't match")
  };

  return payload;
}

// Take a string and return the base64 equivalent
function base64Decode(str){
  return new Buffer(str, 'base64').toString();
}

function verify(raw, secret, signature){
  return signature = sign(raw, secret);
}
