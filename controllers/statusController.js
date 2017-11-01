var statusController = function(Media, Post, Event, Speaker, User){

  var get = function(req, res, next){
    let status = {};

    const promises = [

    // Query each DB collection in turn
    Media.count().exec()
      .then((count)=>{
        status.media = count;

      })
      .catch((err)=>{
        next(err)
      }),
    Post.count().exec()
      .then((count)=>{
        status.posts = count;

      })
      .catch((err)=>{
        next(err)
      }),
    Event.count().exec()
      .then((count)=>{
        status.events = count;

      })
      .catch((err)=>{
        next(err)
      }),
    Speaker.count().exec()
      .then((count)=>{
        status.speakers = count;

      })
      .catch((err)=>{
        next(err)
      }),
    User.count().exec()
      .then((count)=>{
        status.users = count;

      })
      .catch((err)=>{
        next(err)
      })
    ];
    // Wait for all the above promises to resolve, then send the response
    Promise.all(promises).then(function(){
          res.status(200).json({
            uptime: process.uptime(),
            counts: status
          });
    })
  }

  // Expose public methods
  return {
    get: get,
  }
}

module.exports = statusController;
