const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    codes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Code'
    }],
    name: {
        type: String,
        required: true
    },
    commits: {
        type: Number
    }
}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;