const express = require('express');
const {uploadVideo, getVideoList} = require('../controllers/videoUploadController');
const {videoUploadMulter} = require('../middlewares/filterVideoFile');

const router = express.Router();

router
	.post('/upload',videoUploadMulter, uploadVideo)
	.get('/all', getVideoList);

module.exports = router;
