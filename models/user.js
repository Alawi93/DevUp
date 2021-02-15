const mongoose = require('mongoose');


// Schema
const userSchema = new mongoose.Schema({
    _id: Number,
    mail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Not a valid emails'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not a a valid email']
    },

    password: String,
    isAdmin: Boolean,
    email: String,
    professionLabel: String,
    age: Number,
    country: String,
    yearsExperience: Number,
    profilePictPath: String,
    pricePerHour: Number,
    rating: Number,
    ratings: Number,
    memmberSince: {
        type: Date,
        default: Date.now(),

    },
    selfDescription: String,
    banUntil: Date,
    skillset: [{
        skillName: String,
        skillRate: Number,
    }]
});


var validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Model class
//const User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User', userSchema);


