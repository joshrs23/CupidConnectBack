const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    
    _matchId:{
        type: String,
        required: true,
    },
    sender:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now  
    }
}) 

module.exports = mongoose.model('messages', messagesSchema)