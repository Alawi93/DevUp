var express     = require('express');
var router      = express.Router();
const User      = require('../models/user');
const Utils     = require('../models/utils');
const devCont   = require('../controller/developerController');

 //TODO check following
    /**
     * 1. f̶i̶l̶t̶e̶r̶ ̶o̶n̶ ̶c̶e̶r̶t̶a̶i̶n̶ ̶c̶r̶i̶t̶e̶r̶i̶a̶,̶ ̶p̶r̶i̶c̶e̶ ̶r̶a̶n̶g̶e̶ ̶e̶t̶c̶
     * 2. f̶i̶l̶t̶e̶r̶ ̶r̶e̶t̶r̶i̶e̶v̶e̶d̶ ̶u̶s̶e̶r̶ ̶d̶a̶t̶a̶
     * 3. Icke inloggad måste skicka ett default request {"is_admin": false,"skills": [],"name_start": "","price_max" : 1000}
     */


//https://localhost/api/developers
router.post('/',function(req,res){ 
   var body = req.body;
   var filterResult = 'email password isAdmin name professionLabel age country yearsExperience pricePerHour memberSince selfDescription isBanned skillset' 
   const filter = devCont.searchFilter(body.is_admin,body.skills,body.name_start,body.price_max); 
   const  regex = new RegExp(body.name_start,'i');
                                     
    User.find({'isAdmin': false,
              'pricePerHour': {$gt : 0, $lte : body.price_max},
              'name': {$regex: regex},
               ...filter
             },filterResult,function(err,user){ 
        if(err){
            res.status(500).json({
                message: { body: "Internal Server Error, please try again later!" },
                statusCode: res.statusCode,
            });
            return;
         }
         if(!user.length){
            res.status(404).json({
                message: { body: `No users matching that criteria.` },
                statusCode: res.statusCode,
                user,
            });
            return;
         }
         res.status(200).json({
            message: { body: `Filtered users were  successfully retrieved.` },
            statusCode: res.statusCode,
            user,
        });
       return;
    }).limit(100);
});

//https://localhost/api/developers/skillsets
router.get('/skillsets',function(req,res){
    Utils.find({},'skillsets -_id',function(err,utils){
     if(err){
        res.status(500).json({
            message: { body: "Internal Server Error, please try again later!" },
            statusCode: res.statusCode,
        });
     } 
      res.status(200).json({
                    message: { body: `Filtered Utils was successfully retrieved.` },
                    statusCode: res.statusCode,
                    utils,
                });
    })
});

module.exports = router;
