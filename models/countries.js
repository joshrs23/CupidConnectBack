const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
    
    _name:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    }
}) 

countriesSchema.path('_name').validate(async(_name)=>{

    const count = await mongoose.models.countries.countDocuments({_name});

    return !count;

}, 'Country already exists.')


module.exports = mongoose.model('countries', countriesSchema)