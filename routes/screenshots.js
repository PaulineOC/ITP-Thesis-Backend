var express = require('express');
var router = express.Router();
const _ = require('lodash');

const db = require('../db/models');
const { User: UserModel } = db;

router.post('/bulk-create-all-images', async function(req, res, next) {
    const { user } = req.body;
    console.log('Creating all photos by User ID: ', user.id);
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    const updatedUser = await UserModel.updateAllUserImages(user.id, user.wallImages, user.overheadImages);
    res.send(updatedUser);
});

router.post('/bulk-create-wall-images', async function(req, res, next) {
    const { user } = req.body;
    console.log('Creating wall photos by User ID: ', user.id);
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    const updatedUser = await UserModel.updateUserWallImages(user.id, user.wallImages);
    res.send(updatedUser);
});

router.post('/bulk-create-overhead-images', async function(req, res, next) {
    const { user } = req.body;
    console.log('Creating overhead photos by User ID: ', user.id);
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    const updatedUser = await UserModel.updateUserOverheadImages(user.id, user.overheadImages);
    res.send(updatedUser);
});

//TEST:

router.get('/get-all/:userId', async function(req, res, next) {
    const { userId } = req.params;

    const user = await UserModel.getScreenShotByUserId(userId);
    if(_.isEmpty(user)){

        //Throw err
        res.err('hi');
    }
    else{

    }
    console.log(user);
    // res.send({
    //     userId: _.isEmpty(user) ? [] : allScreenshots,
    // });

    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    res.json({get: 'get-screenshots'});
});

router.get('/get/:id', function(req, res, next){
    const { id }= req.params;
    res.json({getUserById: 'getUserById'});
});

router.get('/get-all-images-by-user-id', function(req, res, next) {
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    res.json({get: 'get-screenshots'});
});


module.exports = router;
