// Functions for member.js routes


function isBanned(devUser) {
    if (devUser.banUntil != null) {
        let currDate = new Date().toLocaleString();
        let userDate = devUser.banUntil.toLocaleString()
        if (currDate > userDate) {
            console.log("Not banned")
            return false;
        } else {
            console.log("Is banned")
            return true;
        }
    }
    console.log("Not banned")
    return false;
}


// maybe needed?
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


function createAdminObject(user){
    let returnUser = {
        _id: user._id,
        password: user.password,
        isAdmin: user.isAdmin,
        email: user.email,
    };
    return returnUser;
}

function createClientObject(user){
    let returnUser = {
        _id: user._id,
        password: user.password,
        isAdmin: user.isAdmin,
        email: user.email,
        name: user.name,
        professionLabel: user.professionLabel,
        age: user.age,
        country: user.country,
        yearsExperience: user.yearsExperience,
        pricePerHour: user.pricePerHour,
        github: user.github,
        linkedin: user.linkedin,
        memberSince: user.memberSince,
        selfDescription: user.selfDescription,
        isBanned: user.isBanned,
        skillset: user.skillset
    };
    return returnUser;
}




module.exports = {
    isBanned: isBanned,
    createClientObject: createClientObject,
    createAdminObject: createAdminObject,
}