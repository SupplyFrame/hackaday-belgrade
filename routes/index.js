var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('2020', { title: 'Hackaday | Belgrade 2018' });
});

router.get('/2018', function(req, res, next) {
  res.render('2018', { title: 'Hackaday | Belgrade 2018' });
});

router.get('/2016', function(req, res, next) {
  res.render('index', { title: 'Hackaday | Belgrade 2016' });
});

router.get('/2018', function(req, res, next) {
  res.render('2018', { title: 'Hackaday | Belgrade 2018' });
});

router.get('/xak', function(req, res, next) {
  res.render('xak', { title: 'xak' });
});

module.exports = router;
