const Booking = require('../models/booking');
const Test = require('../models/test');

// Get all bookings for a patient
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.userId })
      .populate('test', 'name description price')
      .populate('patient', 'name email');
    
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { patient, test, reportUrl, timeSlot } = req.body;

    // Validate that the test exists
    const testExists = await Test.findById(test);
    if (!testExists) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Create new booking
    const booking = new Booking({
      patient: patient || req.userId,
      test: test,
      reportUrl: reportUrl,
      date: new Date(),
      timeSlot: timeSlot ? new Date(timeSlot) : null
    });

    await booking.save();

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Get a specific booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('test', 'name description price')
      .populate('patient', 'name email');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

// Update a booking (e.g., add report URL)
exports.updateBooking = async (req, res) => {
  try {
    const { reportUrl } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { reportUrl },
      { new: true }
    ).populate('test', 'name description price')
     .populate('patient', 'name email');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Booking updated successfully', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating booking' });
  }
};