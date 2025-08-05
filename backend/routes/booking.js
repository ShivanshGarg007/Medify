const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const middlewareController = require('../middleware/middlewareController');

// GET endpoint to retrieve all bookings
router.get('/', middlewareController.verifyToken, bookingController.getAllBookings);

// POST endpoint to create a booking
router.post('/', middlewareController.verifyToken, bookingController.createBooking);

// GET endpoint to retrieve a specific booking
router.get('/:id', middlewareController.verifyToken, bookingController.getBookingById);

// PUT endpoint to update a booking (e.g., add report URL)
router.put('/:id', middlewareController.verifyToken, bookingController.updateBooking);

module.exports = router;
