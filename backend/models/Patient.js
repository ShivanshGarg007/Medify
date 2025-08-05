const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('patient', patientSchema);
