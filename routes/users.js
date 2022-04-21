var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/get-screenshots', function(req, res, next) {
  /**
   * Unity will have:
   * UserId
   * Array of screenshots in base64 string
   */
  res.json({test: 'get-screenshots'});
});


router.post('/upload-screenshots', function(req, res, next) {
  /**
   * Unity will have:
   * UserId
   * Array of screenshots in base64 string
   */
  res.json({test: 'upload-screenshots'});
});


module.exports = router;
