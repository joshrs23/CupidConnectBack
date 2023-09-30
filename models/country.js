const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const countrySchema = new mongoose.Schema({
    
    _name:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    }
}) 

countrySchema.path('_name').validate(async(_name)=>{

    const count = await mongoose.models.country.countDocuments({_name});

    return !count;

}, 'Country already exists.')


module.exports = mongoose.model('country', countrySchema)