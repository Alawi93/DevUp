const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Schema
const userSchema = new mongoose.Schema({
    _id: Number,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Not a valid emails'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not a a valid email'],
    },
    password: String,
    isAdmin: Boolean,
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

userSchema.pre('save',function(next){
    var user = this;
//hash password if it is new or has been modified
if(!user.isModified('password')){
    return next();
}
bcrypt.genSalt(saltRounds,function(error,salt){
    if(error){
        return next(error);
    }
    bcrypt.hash(user.password,salt,function(error,hash){
        if(error){
            return next (error);
        }
        //set hashed password
        user.password = hash;
        next();
    });
  });
});
userSchema.methods.comparePassword  = function(providedPassword,cb){
    bcrypt.compare(providedPassword,this.password,function(error,isMatch){
        if(error){
            return cb(error)
        }
        cb(null,isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);


