// server.js
const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 5000;

require('./models');
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// server.js



// after all middleware functions
app.use(express.static('client/build'));
app.use(routes);

// Bootstrap server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
