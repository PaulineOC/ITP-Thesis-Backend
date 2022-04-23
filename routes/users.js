var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { User: UserModel } = db;
router.post('/create', async function(req, res, next) {
  console.log("IN CREATE USER:");

  const { user } = req.body;
  console.log(user);

  const createdUser = await UserModel.createUser(user);

  //Create cookie if successful
  res.send(createdUser);

  //Crea
  //Create user in table
  //create a cookie and set the cookie back to uer
  //send back to the user


//UserID
// generate randomslug//
  //res.json({createUser: 'createUser'});
});

router.get('/get/:id', function(req, res, next){
  const { id }= req.params;
  res.json({getUserById: 'getUserById'});
});

module.exports = router;
