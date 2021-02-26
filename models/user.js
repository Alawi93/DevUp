const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Schema
const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        auto: true
    },
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type:String,
        default: null,
    },
    professionLabel: {
        type:String,
        default: null,
    },
    age: Number,
    country: {
        type:String,
        default: null,
    },
    yearsExperience: {
        type:Number,
        default: null,
    },
    pricePerHour: {
        type:Number,
        default: null,
    },
    github:{
        type:String,
        default: "https://github.com/"
    },
    linkedin:{
        type:String,
        default: "https://www.linkedin.com/"
    },
    memberSince: {
        type: Date,
        default: Date.now(),
    },
    selfDescription: {
        type:String,
        default: null,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    skillset: [{
        skillName: String,
        skillRate: Number,
        default: [{}]
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


