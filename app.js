const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// creating express instance
const app = express();

// allow all cors
app.use(cors());

// parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup database
// eslint-disable-next-line no-undef
console.log('logging', process.env.DB_CONNECTION_STRING);

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('Connected to DB...'))
	.catch(error => console.log('Could not connected to DB...', error));


// set up route
app.use('/video', require('./routes/video'));


module.exports = {
	app: app
};
