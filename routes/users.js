var express = require('express');
var router = express.Router();


router.get('/get-screenshots', function(req, res, next) {
  /**
   * Unity will have:
   * UserId
   * Array of screenshots in base64 string
   */
  res.json({get: 'get-screenshots'});
});

router.post('/upload-screenshots', function(req, res, next) {
  /**
   * Unity will have:
   * UserId
   * Array of screenshots in base64 string
   */
  res.json({upload: 'upload-screenshots'});
});


module.exports = router;
