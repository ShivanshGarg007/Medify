const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
