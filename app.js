
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');

// Open database connection
mongoose.Promise = promise;
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/conferoo';
var db = mongoose.connect(mongoUrl, {
  useMongoClient: true
});

// Get express app
var app = express();

// Import routers, injecting app object where necessary
var index = require('./routes/index');
var users = require('./routes/users')(app);
var events = require('./routes/events')(app);
var auth = require('./routes/auth')(app);

// Set view engine & dir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Bind routers to URL paths
app.use('/', index);
app.use('/api/users', users);
app.use('/api/events', events);
app.use('/api/authenticate', auth);

// Allow other files to import the app object
module.exports = app;
