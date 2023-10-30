const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    
    _liker_userId:{
        type: String,
        required: true,
    },
    _liked_userId:{
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now  
    }
}) 

module.exports = mongoose.model('likes', likesSchema)