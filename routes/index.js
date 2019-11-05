var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My crappy lil app' });
});

router.get('/main', function(req, res, next) {
  res.render('main', { title: 'My crappy main page' })
})



module.exports = router;
