const mongoose     = require('mongoose');


// Schema
const utilSchema = new mongoose.Schema({
  skillsets: [String]
});

 
  // Model class
 module.exports = mongoose.model('Utils', utilSchema)

/*
  const utils = new Xx({
    skillsets: [
        'Java',
        'HTML',
        'JavaScript',
        'C++',
        'C',
        'C#',
        'MySql',
        'MongoDB'
    ]
  });

  console.log(utils)
  */
/*
  module.exports = {
    "lol": test,
   "model": mongoose.model('Utils', utilSchema),
   "connect": skillSchemeExist
  }
  */

  function test(){
    console.log("Test sending func");
  }
  





