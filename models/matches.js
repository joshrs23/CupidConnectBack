const mongoose = require('mongoose');

const matchesSchema = new mongoose.Schema({
    
    _userId1:{
        type: String,
        required: true,
    },
    _userId2:{
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now  
    }
}) 

module.exports = mongoose.model('matches', matchesSchema)