var express     = require('express');
var router      = express.Router();
const User      = require('../models/user');
const Utils     = require('../models/utils');
const devCont   = require('../controller/developerController');

//https://localhost/api/developers
router.post('/',function(req,res){ 
   var body = req.body;
   var filterResult = 'email password isAdmin name professionLabel age country yearsExperience pricePerHour memberSince selfDescription isBanned skillset github linkedin' 
   const filter = devCont.searchFilter(body.is_admin,body.skills,body.name_start,body.price_max); 
   const  regex = new RegExp(body.name_start,'i');
                                     
    User.find({'isAdmin': false,
              'pricePerHour': {$gt : 0, $lte : body.price_max},
              'name': {$regex: regex},
               ...filter
             },filterResult,function(err,user){ 
        if(err){
            return res.status(500).json({
                message: { body: "Internal Server Error, could not search database .Please try again later!" },
                statusCode: res.statusCode,
            });
            
         }
         if(!user.length){
            return  res.status(404).json({
                message: { body: `No users matching that criteria.` },
                statusCode: res.statusCode,
                user,
            });
            
         }
         return res.status(200).json({
            message: { body: `Filtered users were  successfully retrieved.` },
            statusCode: res.statusCode,
            user,
        });
       
    }).limit(100);
});

//https://localhost/api/developers/skillsets
router.get('/skillsets',function(req,res){
    Utils.find({},'skillsets -_id',function(err,utils){
     if(err){
      return  res.status(500).json({
            message: { body: "Internal Server Error, could not search database. Please try again later!" },
            statusCode: res.statusCode,
        });
     } 

     if(!utils){
        return  res.status(404).json({
            message: { body:`The utils does not exist in the database!` },
            statusCode: res.statusCode,
        });
    }

    return  res.status(200).json({
                    message: { body: `Filtered Utils was successfully retrieved.` },
                    statusCode: res.statusCode,
                    utils,
                });
    })
});

module.exports = router;
