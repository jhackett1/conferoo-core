// Import New Relic APM
require('newrelic');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');
var fileUpload = require('express-fileupload');
var cors = require('cors')
var multer = require('multer');

// Open database connection
mongoose.Promise = promise;
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/conferoo';
var db = mongoose.connect(mongoUrl, {
  useMongoClient: true
});

// Get express app
var app = express();

// Import routers, injecting app object where necessary
var users = require('./routes/users')(app);
var events = require('./routes/events')(app);
var polls = require('./routes/polls')(app);
var speakers = require('./routes/speakers')(app);
var posts = require('./routes/posts')(app);
var auth = require('./routes/auth')(app);
var pages = require('./routes/pages')(app);
var media = require('./routes/media')(app);
var status = require('./routes/status')(app);
var agenda = require('./routes/agenda')(app);

// Set view engine & dir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
// Set up the file upload middleware
// app.use(fileUpload());

app.use(multer({dest:path.join(__dirname, 'tmp')}).single('upload'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable preflight CORS support for custom requests
app.options('*', cors());

// Bind routers to URL paths
app.use('/api/agenda', agenda);
app.use('/api/users', users);
app.use('/api/events', events);
app.use('/api/polls', polls);
app.use('/api/speakers', speakers);
app.use('/api/posts', posts);
app.use('/api/pages', pages);
app.use('/api/authenticate', auth);
app.use('/api/media', media);
app.use('/api/status', status);

// Error handling middleware
app.use(function(err, req, res, next){
  // Send the error to the user
  res.status(err.statusCode || 500).json({
    "success": false,
    "message": err.message
  });
})

// Allow other files to import the app object
module.exports = app;
