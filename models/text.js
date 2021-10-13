const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema({
    description: {
        required: true,
        type: String,
    },
    createdAt: {
        default: () => new Date(+new Date() + 8*60*60*1000),
        type: Date,
    },
    sender: {
        required: false,
        type: String,
    },
});

const Text = mongoose.model('Image', TextSchema);

module.exports = Text;