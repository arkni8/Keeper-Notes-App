const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: String,
    content: String,
},
{
    timestamps: true,
});

module.exports = mongoose.model('Notes', noteSchema);