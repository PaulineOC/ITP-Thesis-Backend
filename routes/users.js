var express = require('express');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

var router = express.Router();

const db = require('../db/models');
const { User: UserModel } = db;

router.post('/create', async function(req, res, next) {
  console.log("Create New User:");
  const { user } = req.body;

  const uniqueId = uuidv4();
  const createdUser = await UserModel.createUser(user.username, uniqueId);

  res.send(createdUser);


});

router.patch('/add-to-saved-art/', async function(req, res, next){
  const { user } = req.body;
  console.log("Add to User Art by Id: ", user.id);
  const updatedUser = await UserModel.addToUserSavedArt(user.id, user.toAdd, user.uniqueId);
  res.send({user: updatedUser});
});

router.delete('/remove-from-saved-art/', async function(req, res, next){
  const { user } = req.body;
  console.log("Remove from User Art by Id: ", user.id);
  const updatedUser = await UserModel.removeFromUserSavedArt(user.id, user.toRemove, user.uniqueId);
  res.send({user: updatedUser});
});

router.get('/get/:userId', async function(req, res, next){
  const { userId } = req.params;
  const { uniqueId } = req.query;
  console.log("Get User by Ids: ", userId, uniqueId);
  const foundUser = await UserModel.getUserById(userId, uniqueId);
  if(_.isEmpty(foundUser)){
    res.send({error: ('UserId does not exist')});
  }
  else{
    res.send({user: foundUser});
  }
});

module.exports = router;
