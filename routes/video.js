const express = require('express');
const {uploadVideo} = require('../controllers/videoUploadController');

const router = express.Router();

router
	.post('/upload', uploadVideo);

module.exports = router;
