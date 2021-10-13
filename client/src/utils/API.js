import axios from 'axios';

export default {
	// Gets all books
	getTexts: function() {
		return axios.get('/api/texts');
    },
    
    sendText: function(textData) {
		return axios.post('/api/texts', textData);
	},
	// Gets the book with the given id
	deleteText: function(id) {
		return axios.get('/api/texts/' + id);
	}
	// Saves a book to the database
	
};