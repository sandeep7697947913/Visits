var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Visitors' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Visitors' });
});

module.exports = router;
