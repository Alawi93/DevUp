var express     = require('express');
var router      = express.Router();
//const passport  = require('passport');

//https://localhost/api/developers
router.get('/',function(req,res){ //also includes get filtered members
    var body = req.body;

    //const filter = body.filter

    //isadmin? yes -> more chooices : no less
    //json array av developers
    
    //admin
    //ban
    //unban
    //get list of banned

    //always check filter variables
    //if admin use banned variable
    //else set banned = false
});

 module.exports = router;