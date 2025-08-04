const express = require('express');
const router = express.Router();
const Test = require('../models/test');
const path = require('path');

// GET endpoint for tests catalog 
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
});

// GET endpoint to return dummy report data as file 
router.get('/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../assets/dummy_report.pdf');
    res.download(filePath, 'lab_report.pdf');
  } catch (err) {
    res.status(500).json({ message: 'Error downloading file' });
  }
});

module.exports = router;
