const uploadVideo = (req, res) => {
	console.log('processing');
	console.log(req.body);
	res.json('success');
};

module.exports = {
	uploadVideo
};
