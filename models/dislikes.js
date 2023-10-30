const mongoose = require('mongoose');

const dislikesSchema = new mongoose.Schema({
    
    _disliker_userId:{
        type: String,
        required: true,
    },
    _disliked_userId:{
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now  
    }
}) 

module.exports = mongoose.model('dislikes', dislikesSchema)