const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    codeforces: {
        type: Number
    },
    codechef: {
        type: Number
    },
    gfg: {
        type: Number
    },
    rating: {
        type: Number
    },
    title: {
        type: String
    },
    info: {
        type: String
    }
}, {timestamps: true});

const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;