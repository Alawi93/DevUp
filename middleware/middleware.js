const Utils = require("../models/utils")
const User = require("../models/user")
const moongose = require("mongoose");
const Admin = require("../models/user")

/*
    Will display incoming requests to our routes in the console
    and it will also display the access method.
*/

function incomingRequest(req,res,next){
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
                console.log("No Dummy user record, creates it in DB")
                let dummyUser = new User({
                    password: "hejhej123",
                    isAdmin: false,
                    email: "hithereman@hotmail.com",
                    name: "Gunnar",
                    professionLabel: 'desktop-master',
                    age: 5,
                    country: 'iraq',
                    yearsExperience: 4,
                    pricePerHour: 35,
                    memberSince: Date.now(),
                    selfDescription: 'kinda cool',
                    isBanned: false,
                    skillset:[{skillName: 'java', skillRate: 5}] 
                })
                dummyUser.save()
            } else {
                console.log("Dummy user exist, Skip creation")
            }
        }
    })
}


// Debuging adding user to database
function checkAddAdmin() {
    Admin.findOne({isAdmin: true}, function (err, data) {
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