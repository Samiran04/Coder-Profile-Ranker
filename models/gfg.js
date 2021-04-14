const mongoose = require('mongoose');

const gfgSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    ranking: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Gfg = mongoose.model('Gfg', gfgSchema);

module.exports = Gfg;