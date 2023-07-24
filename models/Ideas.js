const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wall_id: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    share_user: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ideas', IdeaSchema);