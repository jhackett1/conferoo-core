var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Auth modules
var passport = require('passport');
var jwt = require('jwt-simple');

// Open database connection
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/conferoo';
var db = mongoose.connect(mongoUrl, {
  useMongoClient: true
});

// Get express app
var app = express();

// Import routers, injecting models where necessary
var index = require('./routes/index');
var auth = require('./routes/auth')(app);
var events = require('./routes/events')(app);

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
app.use('/api/auth', auth);
app.use('/api/events', events);

// Catch 404s and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Recieve and handle 404s
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
