const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  date: { type: Date, default: Date.now },
  timeSlot: { type: Date },
  reportUrl: String
});

module.exports = mongoose.model('booking', bookingSchema);
