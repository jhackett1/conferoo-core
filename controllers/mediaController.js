var fs = require('fs');
const sortBy = require('sort-array');


// Import AWS SDK for S3 uploads
var AWS = require('aws-sdk');
// Set AWS credentials from environment vars
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
// Create an S3 object to handle uploads
var conferooBucket = new AWS.S3({params: {Bucket: process.env.S3_BUCKET_NAME}});


var mediaController = function(Media){

  // Recieve file uploads, saving them on the server and making a database record
  var post = function(req, res, next){
    // If there are no files, pass an error
    if (!req.file) return next(new Error("No files were attached."));
    // Get the file
    let upload = req.file;
    // Only allow specified filetypes
    var match = ['image/jpg','image/gif','image/jpeg','image/png'].includes(upload.mimetype);
    if (!match) return next(new Error("That file type is not supported."));
    // Build a filename for the upload, based on the date
    let filename = buildFilename(upload.originalname);
    // Initialise file upload
    conferooBucket.upload({
      ACL: 'public-read',
      Body: fs.createReadStream(upload.path),
      Key: filename,
      ContentType: 'application/octet-stream'
    },
    function (err, data) {
      if (err) return next(err);
      console.log(data)
      // Add a record in the database
      res.status(201).json({message: data}).end();
    })
  }

  var get = function(req, res, next){
    conferooBucket.listObjects({}, function(err, data){
      if(err){return next(err)};
      // Send the results
      res.status(200).json(data.Contents);
    })
  }

  var deleteSingle = function(req, res, next){
    // Delete from S3
    conferooBucket.deleteObject({
      Key: req.params.id
    }, function(err, data) {
      if (err) return next(err);
      // Thanks user, we're done here
      res.status(200).json({message: "Media deleted successfully."});
    });
  }

  // Expose public methods
  return {
    get: get,
    post: post,
    delete: deleteSingle
  }
}

module.exports = mediaController;
