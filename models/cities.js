const mongoose = require('mongoose');

const citiesSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    province_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'provinces', 
        required: true,
    }
}) 


module.exports = mongoose.model('cities', citiesSchema)