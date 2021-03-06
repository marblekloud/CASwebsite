// models/index.js

const mongoose = require('mongoose');
const config = require('../config/index');
const URI = config.mongoURI;

mongoose.connect(process.env.MONGODB_URI || URI);

// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose Default Connection Error : ' + err);
});