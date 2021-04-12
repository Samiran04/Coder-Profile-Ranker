const mongoose = require('mongoose');

const codechefSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    }
}, {timestamps: true});

const CodeChef = mongoose.model('CodeChef', codechefSchema);

module.exports = CodeChef;