const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const cloudinary = require('../utils/Cloudinary.js');
const router = express.Router();

router.get('/report/:id', auth, async (req, res) => {
  try {
    const reportUrl = cloudinary.url('reports/default_report', {
      resource_type: 'raw',
      secure: true
    });

    res.json({ url: reportUrl });
  } catch {
    res.status(500).json({ message: 'Failed to get report' });
  }
});
