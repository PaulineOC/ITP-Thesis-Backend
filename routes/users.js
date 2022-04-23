var express = require('express');
var router = express.Router();

router.post('/create', function(req, res, next) {
//UserID
// generate randomslug//
  res.json({createUser: 'createUser'});
});

router.get('/get/:id', function(req, res, next){
  const { id }= req.params;
  res.json({getUserById: 'getUserById'});
});

module.exports = router;
