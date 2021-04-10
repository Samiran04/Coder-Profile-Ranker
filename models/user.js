const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rank :{
        type: Number
    },
    points: {
        type: Number
    },
    cgpa: {
        type: Number
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;