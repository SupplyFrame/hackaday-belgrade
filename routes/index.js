var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('2018', { title: 'Express' });
});

router.get('/2016', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/2018', function(req, res, next) {
  res.render('2018', { title: 'Express' });
});


module.exports = router;
