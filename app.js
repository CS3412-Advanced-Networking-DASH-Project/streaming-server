const express = require('express');
const cors = require('cors');

// creating express instance
const app = express();

// allow all cors
app.use(cors());

// parse the request body
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

module.exports = {
	app: app
};
