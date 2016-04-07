var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/belgrade/stream/', function(req, res, next) {
  res.render('stream', { title: 'Express' });
});

/* GET home page. */
router.get('/stream/', function(req, res, next) {
  res.render('stream', { title: 'Express' });
});

module.exports = router;
