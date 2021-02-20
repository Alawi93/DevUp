var express     = require('express');
var router      = express.Router();
const mongoose  = require('mongoose');
const User      = require('../models/user');


//https://localhost/api/member
router.delete('/', function (req, res) { //delete 

});

//https://localhost/api/member
router.put('/', function (req, res) { //update
    // req.body = json objekt    
    // inte admin - skriv över allt förutom isBanned, rating etc
    //isadmin? update everything (skriv över alla attribut)
});
/// TEMP DELETE LATER *******************
/* const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
    banUntil: Date,
});

const user = mongoose.model('User', userSchema)
*/
// *******************************************

//  https://localhost/api/member/login
router.post('/login', function (req, res) {
    //let loginData = req.query;
   // userExist(loginData, res)

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log(err);
            res.status(500).json({
                message:{body: "Internal Server Error, please try again later!"},
                statusCode: res.statusCode,
            });
        }
        user.comparePassword(req.body.password,function(err,isMatch){
            if(!isMatch){
                res.status(403).json({message:{body: "User exist but password does not match."},
                statusCode: res.statusCode,
                });
            }
            res.status(200).json({message:{body: "Login successfully."},
            statusCode: res.statusCode,
            });
        });
    });


});


// https://localhost/api/member/register
router.post('/register', function (req, res) { // hashing salt
    //json "success"
  
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log(err);
            res.status(500).json({
                message:{body: "Internal Server Error, please try again later!"},
                statusCode: res.statusCode,
            }); 
        }
        if(user){
            res.status(400).json({
                message: {body:"The username is already taken!"},
                statusCode: res.statusCode,
            });
        }else{
            const user = new User({
                _id: 1,
                password: req.body.password,
                isAdmin: false,
                email: req.body.email,
                professionLabel: req.body.professionLabel,
                age: req.body.age,
                country: req.body.country,
                yearsExperience: req.body.yearsExperience,
                profilePictPath: req.body.profilePictPath,
                pricePerHour: req.body.pricePerHour,
                rating: req.body.rating,
                ratings: req.body.ratings,
                memberSince: Date.now(),
                selfDescription: req.body.selfDescription,
                skillset:req.body.skillset
                });

                user.save(function(err,doc){
                    if(err){
                        console.log('err' + err);
                        res.status(500).json({
                            message:{body: "Internal Server Error, please try again later!"},
                            statusCode: res.statusCode,
                        });
                    }
                    console.log('Was successfully saved');
                    res.status(200).json({
                        message:{body: `User ${req.body.email} was successfully created.`},
                        statusCode: res.statusCode,
                });
              });
        }
    })



});


router.get('/logout', function (req, res) {
    //redirect to root route /
});



function userExist(loginData, res) {
    user.exists({ username: loginData.username, password: loginData.password }, function (err, userExistDB) {
        if (err) {
            console.error(err)
        } else {
            if (userExistDB) {
                console.log("User exist!")
                getUser(loginData, res)
            } else {
                console.error("User does not exist!")
                res.json("Error")
            }
        }
    });
}

function getUser(loginData, res) {
    user.findOne({ username: loginData.username, password: loginData.password }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            let devUser = docs
            banned = isBanned(devUser)
            console.log("isbanned: ",banned)
            if(banned){
                res.json({isBanned:banned})
            }else{
                if(devUser.isAdmin){
                    //Return admin stuff
                    res.json({isAdmin:true})
                }else{
                    //return user login stuff
                    res.json({isAdmin:false})
                }
            }


        }
    }).lean();
}

function isBanned(devUser) {
    let currDate = new Date().toLocaleString();
    let userDate = devUser.banUntil.toLocaleString()
    console.log(currDate)
    console.log(userDate)
    if (currDate > userDate) {
        console.log("not banned")
        return false;
    } else {
        console.log("Is banned")
        return true;
    }
}



module.exports = router;
