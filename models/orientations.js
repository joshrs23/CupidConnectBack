const mongoose = require('mongoose');

const orientationsSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    }
}) 

module.exports = mongoose.model('orientations', orientationsSchema)