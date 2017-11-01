var statusController = function(Media, Post, Event, Speaker, User){

  var get = function(req, res){
    let status = {};

    const promises = [

    // Query each DB collection in turn
    Media.count().exec()
      .then((count)=>{
        status.media = count;
        console.log(count)
      })
      .catch((err)=>{
        console.log(err)
      }),
    Post.count().exec()
      .then((count)=>{
        status.posts = count;
        console.log(count)
      })
      .catch((err)=>{
        console.log(err)
      }),
    Event.count().exec()
      .then((count)=>{
        status.events = count;
        console.log(count)
      })
      .catch((err)=>{
        console.log(err)
      }),
    Speaker.count().exec()
      .then((count)=>{
        status.speakers = count;
        console.log(count)
      })
      .catch((err)=>{
        console.log(err)
      }),
    User.count().exec()
      .then((count)=>{
        status.users = count;
        console.log(count)
      })
      .catch((err)=>{
        console.log(err)
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
