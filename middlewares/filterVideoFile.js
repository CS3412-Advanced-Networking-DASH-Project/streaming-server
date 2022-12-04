const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// eslint-disable-next-line no-undef
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const videoUploadMulter = multer({storage: storage}).single('video');

exports.videoUploadMulter = videoUploadMulter;