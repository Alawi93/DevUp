const mongoose = require('mongoose');

// Schema
const utilSchema = new mongoose.Schema({
  skillsets: [String]
});

// Model class
module.exports = mongoose.model('Utils', utilSchema)






