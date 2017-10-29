var sharp = require('sharp');

var mediaController = function(Media){

  // Build filenames
  var buildFilename = function(rawFilename){
    // Helper function for date padding
    function pad(n){return n<10 ? '0'+n : n}
    let now = new Date();
    return  pad(now.getHours().toString()) +
            pad(now.getMinutes().toString()) +
            pad(now.getSeconds()) + "_" +
            pad(now.getDate()) +
            pad(now.getMonth()+1) +
            pad(now.getFullYear()) + "_" +
            rawFilename;
  }

  // Make a 150x150px preview copy of each image in a subfolder
  var buildPreview = function(filename, originalImagePath, cb){
    let previewPath = `./public/uploads/previews/${filename}`;
    sharp(originalImagePath).resize(150, 150).toFile(previewPath, function(err, info){
      if(err) return console.log(err);
      // Trigger the callback function, passing in the path generated
      cb(previewPath);
    });
  }

  // Recieve file uploads, saving them on the server and making a database record
  var post = function(req, res, next){
    // If there are no files, say so
    if (!req.files) return res.status(400).json({message: "No files were attached"});
    // Get the file
    let upload = req.files.upload;
    // Build a filename for the upload, based on the date
    let now = new Date();
    let filename = buildFilename(upload.name);
    let path = `./public/uploads/${filename}`;
    // Place the file on the server
    upload.mv(path, function(err) {
      if (err) return res.status(500).json({message: err});
      // Create preview
      buildPreview(filename, path, function(previewPath){
        // Add a record in the database
        var newMedia = new Media({
          sources: {
            full: req.protocol + "://" + req.get('host') + path.slice(8),
            preview: req.protocol + "://" + req.get('host') + previewPath.slice(8)
          },
          title: upload.name,
          uploadedAt: new Date()
        });
        newMedia.save(function(err, newMedia){
          if(err){return next(err)};
          res.status(201).json({message: newMedia});
        });
      });
    });
  }

  var get = function(req, res, next){
    Media.find().exec( function(err, events, next){
      if(err){return next(err)};
      // Send the results
      res.status(200).json(events);
    })
  }

  // Expose public methods
  return {
    get: get,
    post: post
  }
}

module.exports = mediaController;
