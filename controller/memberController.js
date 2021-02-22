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




module.exports = {
    isBanned: isBanned,
}