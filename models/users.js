const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    _email:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    },
    _username:{
        type: String,
        required: true,
        index: {
            unique: true, 
            dropDups: true
        },
    },
    _fname:{
        type: String,
        required: true,
    },
    _lname:{
        type: String,
        required: true,
    },
    _password:{
        type: String,
        required: true,
    },
    country:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country', 
        required: true,
    },
    province:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'province', 
        required: true,
    },
    city:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'city', 
        required: true,
    },
    _address:{
        type: String,
        required: true,
    },
    _dob:{
        type: Date,
        required: true,
    },
    _interests: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'interest', 
        required: false,
    }],
    _orientations: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'orientation', 
        required: false,
    }],
    identities: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'identity', 
        required: false,
    }],
    _type:{
        type: Number,
        required: true,
    },
    _profilePicture:{
        type: String,
        required: false,
    },
    _pictures: {
        type: [String], // Array of strings
        required: false,
    },
    _description:{
        type: String,
        required: false,
    },
    _active:{
        type: Boolean,
        required: true,
    }
}) 

usersSchema.path('_email').validate(async(_email)=>{

    const count = await mongoose.models.users.countDocuments({_email});

    return !count;

}, 'Email already exists.')

usersSchema.path('_email').validate((_email)=>{

    const emailFormat =  _email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/);

    return emailFormat;

}, 'The format of the email is wrong.')

usersSchema.path('_password').validate((_password)=>{

    const passwordCount =  _password.length > 7 && _password.length < 21;

    return passwordCount;

}, 'Password size has to be minimun 8 values and maximun 20 characters.')


usersSchema.pre('save', function(next){
    if(this.isModified('_password')){
        bcrypt.hash(this._password, 9 , (err, hash) => {
            if(err) return next(err);
            this._password = hash;
            next();
        })
    }
})

usersSchema.methods.comparePassword = async function(_password) {
    if(!_password) throw new Error('Password is missing.')
    try{
        const result = await bcrypt.compare(_password, this._password);
        return result;
    }catch(err){
        console.log('Error in password validation.', err.message)
    }
};

module.exports = mongoose.model('users', usersSchema)