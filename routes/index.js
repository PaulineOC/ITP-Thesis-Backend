var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('/welcome');
  res.send({home: "1234"});
});


module.exports = router;
