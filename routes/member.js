var express     = require('express');
var router      = express.Router();
//const passport  = require('passport');


//https://localhost/api/member
router.delete('/',function(req,res){ //delete 
    
});

//https://localhost/api/member
router.put('/',function(req,res){ //update
    // req.body = json objekt    
    // inte admin - skriv över allt förutom isBanned, rating etc
    //isadmin? update everything (skriv över alla attribut)
});

//  https://localhost/api/member/login
router.get('/login',function(req,res){
    //check if admin  or banned or auth
    //1. databas fail --> json error msg
    //2. isAdmin --> framsidan + more options json
    //3. vanlig user --> framsidan + knapp json
});
    
    
    // https://localhost/api/member/register
router.post('/register',function(req,res){ // hashing salt
    //json "success"
});
        
    
router.get('/logout',function(req,res){
    //redirect to root route /
});
    
    
module.exports = router;