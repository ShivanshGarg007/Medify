const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model('test', testSchema);
