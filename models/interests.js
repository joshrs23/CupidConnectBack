const mongoose = require('mongoose');

const interestsSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    }
}) 

module.exports = mongoose.model('interests', interestsSchema)