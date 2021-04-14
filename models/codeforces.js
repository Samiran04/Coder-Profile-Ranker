const mongoose = require('mongoose');

const codeForcesSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const CodeForces = mongoose.model('CodeForces', codeForcesSchema);

module.exports = CodeForces;