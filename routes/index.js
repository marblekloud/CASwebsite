// index.js

const router = require('express').Router();
const textRoutes = require('./texts');
const path = require('path');

router.use('/api/texts', textRoutes);
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;