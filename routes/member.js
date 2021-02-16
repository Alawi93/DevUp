var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//const passport  = require('passport');


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
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
    banUntil: Date,
});

const user = mongoose.model('User', userSchema)

// *******************************************

//  https://localhost/api/member/login
router.post('/login', function (req, res) {
    let loginData = req.query;

    userExist(loginData, res)

});


// https://localhost/api/member/register
router.post('/register', function (req, res) { // hashing salt
    //json "success"
    let test = new user({
        username: "user",
        password: "pass",
        isAdmin: true,
        banUntil: Date.now()
    });
    test.save()
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
