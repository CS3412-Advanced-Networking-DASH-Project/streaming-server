const {Server} = require('socket.io');
const {createAndConfigureVideoNamespace} = require('./videos/namespace-config');

let io;

const createIOInstance = (server) => {
	// create socket.io sever instance
	io = new Server(server, {
		serveClient: false,
		cors: {
			origin: '*'
		}
	});

	// configure custom namespace for video upload
	createAndConfigureVideoNamespace(io);

	return io;
};

module.exports = {
	createIOInstance
};