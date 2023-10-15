const mongoose = require('mongoose');

const identitiesSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    }
}) 

module.exports = mongoose.model('identities', identitiesSchema)