var sharp = require('sharp');
var fs = require('fs');
var s3 = require('../services/s3');

var mediaController = function(Media){

  // Filename-building helper function
  var buildFilename = function(rawFilename){
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

  // Process a preview image of a given file to a given width and height
  var buildPreview = function(width, height, filename, originalImagePath, cb){
    let previewPath = `./tmp/${filename}`;
    sharp(originalImagePath).resize(width, height).toFile(previewPath, function(err, info){
      if(err){return cb(err, null);
      } else {
        cb(null, previewPath);
      }
    });
  }

  // Process uploads: perform validation, process previews, upload to S3 and make DB record
  var post = function(req, res, next){
    // Validate file is attached
    if (!req.file) return next(new Error("No files were attached."));
    // Get the file
    let upload = req.file;
    // Validate filetype
    var match = ['image/jpg','image/gif','image/jpeg','image/png'].includes(upload.mimetype);
    if (!match) return next(new Error("That file type is not supported."));
    // Construct filename and path
    let filename = buildFilename(upload.originalname);
    let path = upload.path;
    // Create object to represent new DB entry
    let newMedia = new Media({
      sources: {},
      uploadedAt: new Date()
    });
    // Upload original file to S3...
    s3.upload(path, filename, function(err, data){
      if(err) return next(err);
      newMedia.title = data.Key;
      newMedia.sources.full = data.Location;
      // Now build preview...
      buildPreview(150, 150, filename, path, function(err, previewPath){
        if(err) return next(err);
        // And upload the preview, too...
        s3.upload(previewPath, 'preview_' + filename, function(err, data){
          if(err) return next(err);
          newMedia.sources.preview = data.Location;
            // Move onto medium file size
            buildPreview(1000, null, filename, path, function(err, previewPath){
              if(err) return next(err);
              // And upload the medium image, too
              s3.upload(previewPath, 'medium_' + filename, function(err, data){
                if(err) return next(err);
                newMedia.sources.medium = data.Location;
                // ...finally, save to DB
                newMedia.save(function(err, newMedia){
                  if(err) return next(err);
                  // Did everything work? Send success message if so
                  res.status(201).json(newMedia);
                })
              })
            })
        })
      })
    })
  }

  // Return DB list
  var get = function(req, res, next){
    // Return a list from DB, sorted by most recent first
    Media.find().sort({uploadedAt: -1}).lean().exec( function(err, events, next){
      if(err){return next(err)};
      // Send the results
      res.status(200).json(events);
    })
  }

  // Delete upload: delete original and preview from S3 and purge DB record
  var deleteSingle = function(req, res, next){
    // Get DB entry...
    Media.findById(req.params.id, function(err, media){
      let fullKey = media.title;
      let previewKey = "preview_" + media.title;
      // ...delete full image...
      s3.remove(fullKey, function(err, data){
        if(err){return next(err)};
        // ...delete preview image...
        s3.remove(previewKey, function(err, data){
          if(err){return next(err)};
          // ..and finally, delete DB entry.
          media.remove(function(err){
            if(err){return next(err)};
            // EVerything go okay? Tell the user
            res.status(200).json({message: "Media deleted successfully."});
          })
        })
      })
    })
  }

  // Expose public methods
  return {
    get: get,
    post: post,
    delete: deleteSingle
  }
}

module.exports = mediaController;
