const Utils = require("../models/utils")
const User = require("../models/user")

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
                        'MongoDB'
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
                    _id: 1,
                    password: "hejhej123",
                    isAdmin: false,
                    email: "hithereman@hotmail.com",
                    professionLabel: 'desktop-master',
                    age: 5,
                    country: 'iraq',
                    yearsExperience: 4,
                    profilePictPath: 'eslöv.pdf',
                    pricePerHour: 35,
                    rating: 5,
                    ratings:5,
                    memberSince: Date.now(),
                    selfDescription: 'kinda cool',
                    banUntil: null,
                    skillset:[{skillName: 'java',skillRate: 5}] 
                })
                dummyUser.save()
            } else {
                console.log("Dummy user exist, Skip creation")
            }
        }
    })
}

module.exports = {
    incomingRequest: incomingRequest,
    checkSkillSets: checkSkillSets,
    checkCreateDummyUser: checkCreateDummyUser,  
}