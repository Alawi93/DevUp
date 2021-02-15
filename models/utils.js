const mongoose     = require('mongoose');


// Schema
const utilSchema = new mongoose.Schema({
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

  // Model class
  module.exports = mongoose.model('Utils', utilSchema)


  





