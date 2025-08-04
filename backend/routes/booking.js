const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Test = require('../models/test');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to authenticate token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } 
  
  catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// GET endpoint to retrieve all bookings
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.userId })
      .populate('test', 'name description price')
      .populate('patient', 'name email');
    
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// POST endpoint to create a booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { patient, test, reportUrl } = req.body;

    // Validate that the test exists
    const testExists = await Test.findById(test);
    if (!testExists) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Create new booking
    const booking = new Booking({
      patient: patient || req.userId, // Use provided patient ID or authenticated user ID
      test: test,
      reportUrl: reportUrl,
      date: new Date()
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
});

// GET endpoint to retrieve a specific booking
router.get('/:id', verifyToken, async (req, res) => {
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
});

// PUT endpoint to update a booking (e.g., add report URL)
router.put('/:id', verifyToken, async (req, res) => {
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
});

module.exports = router;
