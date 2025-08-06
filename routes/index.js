var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teste', (req, res) => {
  res.render('html/teste/Rotas');
});


module.exports = router;