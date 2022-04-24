var express = require('express');
const _ = require('lodash');
var router = express.Router();

const db = require('../db/models');
const { User: UserModel } = db;

router.post('/create', async function(req, res, next) {
  console.log("Create New User:");
  const { user } = req.body;

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

router.patch('/add-to-saved-art/', async function(req, res, next){
  const { user } = req.body;
  console.log("Add to User Art by Id: ", user.id);
  const updatedUser = await UserModel.addToUserSavedArt(user.id, user.toAdd);
  res.send({user: updatedUser});
});

router.delete('/remove-from-saved-art/', async function(req, res, next){
  const { user } = req.body;
  console.log("Remove from User Art by Id: ", user.id);
  const updatedUser = await UserModel.removeFromUserSavedArt(user.id, user.toRemove);
  res.send({user: updatedUser});
});

router.get('/get/:userId', async function(req, res, next){
  const { userId } = req.params;
  console.log("Get User by Id: ", userId);
  const foundUser = await UserModel.getUserById(userId);
  if(_.isEmpty(foundUser)){
    res.send({error: new Error('UserId does not exist')});
  }

  res.send({user: foundUser});
});

module.exports = router;
