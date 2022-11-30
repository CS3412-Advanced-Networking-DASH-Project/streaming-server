const {Video} = require('../models/video');

const saveVideoDetails = async (title, duration) => {
	const video = new Video({
		title: title,
		duration: duration
	});

	try{
		return await video.save();
	}catch (err) {
		console.log(err);
		return null;
	}
};

module.exports = {
	saveVideoDetails
};