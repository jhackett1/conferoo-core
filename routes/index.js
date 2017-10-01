var express = require('express');
var router = express.Router();

// Display simple page to browsers which directly access page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conferoo' });
});

module.exports = router;
