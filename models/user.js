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
    codechef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodeChef'
    },
    codeforces: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodeForces'
    },
    gfg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gfg'
    },
    rank :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank'
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;