const {Video} = require('../models/video');

const saveVideoDetails = async (title, description) => {
	const video = new Video({
		title: title,
		description: description
	});

	try{
		return await video.save();
	}catch (err) {
		console.log(err);
		return null;
	}
};

const fetchVideoList = async () => {
	try {
		return await Video.find();
	} catch (err) {
		console.log(err);
		return null;
	}
};

module.exports = {
	saveVideoDetails,
	fetchVideoList
};