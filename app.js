const express = require('express');
const cors = require('cors');
const {createServer} = require('http');
const {createIOInstance} = require('./config/socket-io/socketio-config');
const mongoose = require('mongoose');
require('dotenv').config();

// creating express instance
const app = express();

// allow all cors
app.use(cors());

// parse the request body
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// setup database
// eslint-disable-next-line no-undef

console.log('logging', process.env.DB_CONNECTION_STRING);

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('Connected to DB...'))
	.catch(error => console.log('Could not connected to DB...', error));

// setup socket.io
const httpServer = createServer(app);
createIOInstance(httpServer);

module.exports = {
	app: app
};
