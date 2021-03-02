

 function searchFilter (admin,skills,name_start,price_max){
    let adminFilter;
     if(!admin){
      var isBanned = {isBanned: false};
     }
 
     if(skills.length > 0){
     //var skillFilter = {'skillset': {$elemMatch: {'skillName': skills}}};
     var skillFilter = { 'skillset.skillName':  {$all: skills}};
     }
 
     adminFilter ={...isBanned,...skillFilter};
     console.log(adminFilter);
     return adminFilter;
 }
 
module.exports = {
    searchFilter: searchFilter,
}