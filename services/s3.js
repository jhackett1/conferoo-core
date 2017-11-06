// Configure S3 client
var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const bucket = new AWS.S3({params: {Bucket: process.env.S3_BUCKET_NAME}});

var s3 = {

  // Upload a given filename to a given key
  upload: function(file, key, cb){
    bucket.upload({
      ACL: 'public-read',
      Body: file,
      Key: key,
      ContentType: 'application/octet-stream'
    }, function(err, data){
      cb(err, data)
    });
  },
  
  // List all keys
  list: function(cb){
    bucket.listObjects({}, function(err, data){
      cb(err, data)
    });
  },

  // Remove a given key
  remove: function(key, cb){
    bucket.deleteObject({
      Key: key
    }, function(err, data){
      cb(err, data)
    });
  }

}

module.exports = s3;
