var express = require('express');
var router = express.Router();
const _ = require('lodash');
const db = require('../db/models');
const { User: UserModel } = db;
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');

require('dotenv').config();
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

//File Uploading:
aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});


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
  const data = await UserModel.removeFromUserSavedArt(user.id, user.toRemove, user.uniqueId);
  if(data.length >= 1 && data[0] >= 1){
    res.send({user: data[1]});
  }
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  bucket: 'msrainwater-17-itp-thesis-2022-space',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  params: {
    Bucket: 'msrainwater-17-itp-thesis-2022-space',
    endpoint: `nyc3.digitaloceanspaces.com`,
  }
});

router.patch('/upload-wall-images/', async function(req, res, next){
  const { user } = req.body;
  console.log("Upload screenshots for user: ", user.id, user.uniqueId, user.wallImagesToSave.length);

  if(!user.wallImagesToSave){
    res.status(400);
    res.send(new Error('WallImages not passed in'));
  }
  const allUploadedWallImagesPromises = [];

  user.wallImagesToSave.forEach((imgString, ind)=>{
    const buf = Buffer.from(imgString.replace(/^data:image\/\w+;base64,/, ""),'base64');
    const potentialURL = `${user.username}-${user.id}-wall-${ind}`;
    const data = {
      Key: potentialURL,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/png',
      ACL: 'public-read'
    };
    const newPromise = s3.putObject(data).promise();
    allUploadedWallImagesPromises.push({key: potentialURL, promise : newPromise});
  });

  Promise.all(allUploadedWallImagesPromises).then(async function(values) {
    if(!values || values.length !== user.wallImagesToSave.length){
      console.log("Something is weird ");
    }
    else{
      console.log("Successfully finished:", values.length);
      const finalImgLinks = [];
      values.forEach((item, ind)=>{
        const fileName = allUploadedWallImagesPromises[ind].key;
        const url = `https://msrainwater-17-itp-thesis-2022-space.nyc3.digitaloceanspaces.com/${fileName}`;
        // const newObj = {
        //   fileName,
        //   url
        // };
        finalImgLinks.push(url);
      });
      const updatedUser = await UserModel.updateUserWallImages(
          user.id,
          finalImgLinks,
          user.uniqueId
      );
      res.send({user: updatedUser});
    }
  });

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
