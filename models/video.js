const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 255,
		trim: true
	},
	duration: {
		type: Number,
		required: true,
	}
});

const videoModel = mongoose.model('Video', videoSchema);

module.exports = {
	Video: videoModel
};