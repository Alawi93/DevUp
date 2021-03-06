var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const memCont = require('../controller/memberController');
mongoose.set('useFindAndModify', false);


//https://localhost/api/member
router.delete('/', function (req, res) {
  
    let filter = { email: req.body.email };
    User.findOneAndDelete(filter, function (err, docs) {
        if (err) {
            console.error(err);
            return  res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        }
        if(!docs){
            return  res.status(404).json({
                message: { body:`The user ${req.body.email} does not exist in the database.`},
                statusCode: res.statusCode,
            });
        }
       
             return  res.status(200).json({
                message: { body: `The user ${req.body.email} was successfully deleted.` },
                statusCode: res.statusCode,
        });
        
    });

});

//https://localhost/api/member
router.put('/', function (req, res) { //update

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
            return res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        }

        if(!dbUserData){
            return  res.status(404).json({
                message: { body:`The user '${req.body.email}' does not exist in the database.`},
                statusCode: res.statusCode,
            });
        }    
            return  res.status(200).json({
                message: { body: `The user '${req.body.email}' was successfully updated.` },
                statusCode: res.statusCode,
                dbUserData,
            });
    });
});

//https://localhost/api/member/ban
router.put('/ban', function (req, res) { //update
  
    let filter = { email: req.body.email };
    let banUpdate = { isBanned: req.body.ban }

    User.findOneAndUpdate(filter, banUpdate, { new: true }, function (err, dbUserData) {
        if (err) {
            console.log(err);
            return  res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
        }
            if(!dbUserData){
                return  res.status(404).json({
                    message: { body:`The user '${req.body.email}' does not exist in the database.`},
                    statusCode: res.statusCode,
                });
            } 

            if (req.body.ban == true) {
                return res.status(200).json({
                    message: { body: `The user '${req.body.email}' was successfully banned.` },
                    statusCode: res.statusCode,
                });
            } else {
                return  res.status(200).json({
                    message: { body: `The user '${req.body.email}' was successfully unbanned.` },
                    statusCode: res.statusCode,
                });
            }
    });
});

//  https://localhost/api/member/login
router.post('/login', function (req, res) {
    let filter = { email: req.body.email };
    let pwd = req.body.password;

    console.log(req.body.email);
    console.log(req.body.password);

    User.findOne(filter, function (err, dbUserData) {
        if (err) {
            console.log(err);
            return  res.status(500).json({
                message: { body: "Internal Server Error, could not search database. Please try again later!" },
                statusCode: res.statusCode,
            });
            
        }
        if(!dbUserData){
            return  res.status(404).json({
                message: { body:"The user does not exist in the database" },
                statusCode: res.statusCode,
            });
          
        }

        dbUserData.comparePassword(pwd, function (err, isMatch) {
            if(err){
                return  res.status(500).json({
                    message: { body:"Internal Server Error, could not confirm passwords. Please try again later!" },
                    statusCode: res.statusCode,
                });
            }

            if (!isMatch) {
                return  res.status(403).json({
                    message: { body:`The user '${req.body.email}' exists but the password does not match!` },
                    statusCode: res.statusCode,
                });
               
            }
            let userBan = dbUserData.isBanned;
            if (userBan) {
                return  res.status(403).json({
                    message: { body: `The user '${req.body.email}' is banned!` },
                    statusCode: res.statusCode,
                });
               
            } else {
                if (dbUserData.isAdmin) {
                    let user = memCont.createAdminObject(dbUserData);
                    return  res.status(200).json({
                        message: { body: "Logged in successfully as an admin" },
                        statusCode: res.statusCode,
                        user,
                    });
                   
                } else {
                    let user = memCont.createClientObject(dbUserData);
                    req.session.user = user.email;
                    console.log(req.session)
                    return res.status(200).json({
                        message: { body: "Logged in successfully." },
                        statusCode: res.statusCode,
                        user,
                    });
                }
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
           return res.status(500).json({
                message: { body: "Internal Server Error, could not search database. Please try again later!" },
                statusCode: res.statusCode,
            });
        }
        if (user) {
            return res.status(400).json({
                message: { body: `The username '${req.body.email}' is already taken!` },
                statusCode: res.statusCode,
            });
        } else {

            const user = new User({
                password: req.body.password,
                email: req.body.email,
            });
            
            user.save(function (err, doc) {
                if (err) {
                    console.log('err' + err);
            return res.status(500).json({
                        message: { body: "Internal Server Error, could not save user. Please try again later!" },
                        statusCode: res.statusCode,
                    });
                }
                console.log('Was successfully saved');
                req.session.user = user.email;
            return res.status(200).json({
                    message: { body: `The user '${req.body.email}' was successfully created.` },
                    statusCode: res.statusCode,
                    user,
                });
            });
        }
    });
});

//http://localhost:3000/api/member/login
router.get('/logout', function (req, res) {
    if(req.session.user){
        var currentUser = req.session.user;
        req.session.destroy(function(err){
            if(err){
                return res.status(500).json({
                    message: { body: "Internal Server Error, Session was not destroyed, please try again later!" },
                    statusCode: res.statusCode,
                });
            } 
                return res.status(200).json({
                    message: { body: `The user '${currentUser}', succesfully logged out` },
                    statusCode: res.statusCode,
                });
           
        });
    }else{
        return res.status(404).json({
            message: { body: "There is no user currently logged in!" },
            statusCode: res.statusCode,
        });
    } 
});

//http://localhost:3000/api/member/isloggedin
router.get('/isloggedin', function (req, res) {
   var filter = { email: req.session.user };

    if(!req.session.user){
         return res.status(401).json({
            message: { body: 'The user is not currently logged in!' },
            statusCode: res.statusCode,  
        }); 
    }

    User.findOne(filter, function (err, user) {
        if (err) {
            console.log(err);
           return res.status(500).json({
                message: { body: "Internal Server Error, could not search database. Please try again later!" },
                statusCode: res.statusCode,
            });
        }

        if(!user){
            return  res.status(404).json({
                message: { body:`The user ${req.session.user} does not exist in the database!` },
                statusCode: res.statusCode,
            });
        }

        if (user) {
            return res.status(200).json({
                message: { body: `The user ${req.session.user} is currently logged in.` },
                statusCode: res.statusCode,
                user
            });
        }
  });
});
module.exports = router;
