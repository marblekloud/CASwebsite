const router = require('express').Router();
const textsController = require('../controllers/textsController');

router
	.route('/')
	.get(textsController.getTexts)
	.post(textsController.sendText);

router
	.route('/:id')
	.get(textsController.deleteText)

    
module.exports = router;