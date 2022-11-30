const {saveVideoDetails} = require('../../../services/videoService');
const createAndConfigureVideoNamespace = (io) => {
	// set up custom video namespace
	const videoNamespace = io.of('/video');

	// listen for socket connections
	videoNamespace.on('connection', async (socket) => {

		//get video details and save to the db
		const {title, duration} = socket.handshake.query;
		const savedVideo = await saveVideoDetails(title, duration);
		if(!savedVideo) {
			console.log('Error occurred when saving video details', socket.id);
			socket.disconnect();
		}

		// video upload listener
		socket.on('upload-video', async (file) => {
			console.log('file received', file);
		});
	});
};

module.exports = {
	createAndConfigureVideoNamespace
};