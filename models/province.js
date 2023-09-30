const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const provinceSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    country_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'country', 
        required: true,
    }
}) 


module.exports = mongoose.model('province', provinceSchema)