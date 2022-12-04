const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 255,
		trim: true
	},
	description: {
		type: String,
		required: false,
		minLength: 3,
		maxLength: 500,
		trim: true
	}
});

const videoModel = mongoose.model('Video', videoSchema);

module.exports = {
	Video: videoModel
};