const Utils = require("../models/utils")
const User = require("../models/user")
const moongose = require("mongoose");
const Admin = require("../models/user")
const fs = require('fs');

/*
    Will display incoming requests to our routes in the console
    and it will also display the access method.
*/

function incomingRequest(req, res, next) {
    console.log(`Recieved request on path: '${req.path}'\nHTTP method: ${req.method}.`);
    next();
}

function checkSkillSets() {
    Utils.find({}, function (err, data) {
        if (err) {
            console.error(err)
        } else {
            if (data.length == 0) {
                console.log("No skillset records, creates it in DB")
                let test = new Utils({
                    skillsets: [
                        'Java',
                        'HTML',
                        'CSS',
                        'JavaScript',
                        'C++',
                        'C',
                        'C#',
                        'Python',
                        'MySql',
                        'MongoDB',
                        'PhP',
                    ]
                });
                test.save()
            } else {
                console.log("skillset exist, Accepts")
            }
        }
    })
}

// Debuging adding user to database
function checkCreateDummyUser() {
    User.find({}, function (err, data) {
        if (err) {
            console.error(err)
        } else {
            if (data.length == 0) {
                let fileString = fs.readFileSync('dbUsers.json').toString();
                let fileObj = JSON.parse(fileString);
                let userData = fileObj.users;
                for (let index = 0; index < userData.length; index++) {
                    let dummyUser = new User(userData[index])
                    dummyUser.save().then(function () {
                        console.log("Data inserted")  // Success 
                    }).catch(function (error) {
                        console.error(error)      // Failure 
                    });
                }
            } else {
                console.log("Dummy user exist, Skip creation")
            }
        }
    })
}


// Debuging adding user to database
function checkAddAdmin() {
    Admin.findOne({ isAdmin: true }, function (err, data) {
        if (err) {
            console.error(err)
            console.log("No admin")
        } else {
            if (data == null) {
                console.log("No Admin, creates it in DB")

                let dummyAdmin = new Admin({
                    password: "admin1234",
                    isAdmin: true,
                    email: "admin@devup.com",
                    name: "ADMIN",
                })
                dummyAdmin.save()

            } else {
                console.log("Admin exist, Skip creation")
            }
        }
    })
}

module.exports = {
    incomingRequest: incomingRequest,
    checkSkillSets: checkSkillSets,
    checkCreateDummyUser: checkCreateDummyUser,
    checkAddAdmin: checkAddAdmin,
}