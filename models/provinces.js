const mongoose = require('mongoose');

const provincesSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    country_id:{
        /*type: mongoose.Schema.Types.ObjectId, 
        ref: 'countries', */
        type: String,
        required: true,
    }
}) 


module.exports = mongoose.model('provinces', provincesSchema)