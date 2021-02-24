var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const memCont = require('../controller/memberController');
mongoose.set('useFindAndModify', false);

//https://localhost/api/member
router.put('/', function (req, res) { //update
    // req.body = json objekt    
    // compare hashed passwords

    let filter = { email: req.body.email };
    let clientUpdate = {
        email: req.body.email,
        name: req.body.name,
        professionLabel: req.body.professionLabel,
        age: req.body.age,
        country: req.body.country,
        yearsExperience: req.body.yearsExperience,
        pricePerHour: req.body.pricePerHour,
        github: req.body.github,
        linkedin: req.body.linkedin,
        memberSince: req.body.memberSince,
        selfDescription: req.body.selfDescription,
        isBanned: req.body.isBanned,
        skillset: req.body.skillset
    };

    User.findOneAndUpdate(filter, clientUpdate, { new: true }, function (err, dbUserData) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        } else {

            res.status(200).send({
                message: { body: "User Sucessfully Updated." },
                statusCode: res.statusCode,
                dbUserData,
            });
        }

    });
});


//https://localhost/api/member/ban
router.put('/ban', function (req, res) { //update
    console.log(req.body)
    let filter = { email: req.body.email };
    let banUpdate = { isBanned: req.body.ban }

    User.findOneAndUpdate(filter, banUpdate, { new: true }, function (err, dbUserData) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        } else {

            res.status(200).send({
                message: { body: "User Sucessfully Banned." },
                statusCode: res.statusCode,
                dbUserData,
            });
        }

    });
});

//  https://localhost/api/member/login
router.post('/login', function (req, res) {
    let filter = { email: req.body.email };
    let pwd = req.body.password;

    User.findOne(filter, function (err, dbUserData) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        }
        dbUserData.comparePassword(pwd, function (err, isMatch) {
            if (!isMatch) {
                res.status(403).json({
                    message: { body: "User exist but password does not match." },
                    statusCode: res.statusCode,
                });
            }
            let userBan = dbUserData.isBanned;
            if (userBan) {
                res.status(403).json({
                    message: { body: "User is BANNED!." },
                    statusCode: res.statusCode,
                });
            } else {

                let user = memCont.createClientObject(dbUserData)

                res.status(200).send({
                    message: { body: "Login successfully." },
                    statusCode: res.statusCode,
                    user,
                });
            }
        });

    });
});


// https://localhost/api/member/register
router.post('/register', function (req, res) { // hashing salt
    let filter = { email: req.body.email };

    User.findOne(filter, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        }
        if (user) {
            res.status(400).json({
                message: { body: "The username is already taken!" },
                statusCode: res.statusCode,
            });
        } else {
            const user = new User({
                password: req.body.password,
                isAdmin: false,
                email: req.body.email,
                professionLabel: req.body.professionLabel,
                age: req.body.age,
                country: req.body.country,
                yearsExperience: req.body.yearsExperience,
                profilePictPath: req.body.profilePictPath,
                pricePerHour: req.body.pricePerHour,
                memberSince: Date.now(),
                selfDescription: req.body.selfDescription,
                skillset: req.body.skillset
            });

            user.save(function (err, doc) {
                if (err) {
                    console.log('err' + err);
                    res.status(500).json({
                        message: { body: "Internal Server Error, please try again later!" },
                        statusCode: res.statusCode,
                    });
                }
                console.log('Was successfully saved');
                res.status(200).json({
                    message: { body: `User ${req.body.email} was successfully created.` },
                    statusCode: res.statusCode,
                    user,
                });
            });
        }
    });
});



router.get('/logout', function (req, res) {
    //redirect to root route /
});


router.get('/isloggedin', function (req, res) {
    //redirect to root route /
});
module.exports = router;
