var express = require('express');
var router = express.Router();

router.get('/get/:userId', function(req, res, next) {
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    res.json({get: 'get-screenshots'});
});

router.post('/bulk-create', function(req, res, next) {
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    res.json({upload: 'bulk-upload-screenshots'});
});




router.post('/create', function(req, res, next) {
//UserID
// generate randomslug//
    res.json({createUser: 'createUser'});
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

router.post('/upload-images', function(req, res, next) {
    /**
     * Unity will have:
     * UserId
     * Array of screenshots in base64 string
     */
    res.json({upload: 'upload-screenshots'});
});


module.exports = router;
