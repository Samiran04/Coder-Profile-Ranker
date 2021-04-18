const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;