const express = require('express');
const Test = require('../models/Test');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch {
    res.status(500).json({ message: 'Failed to fetch tests' });
  }
});

module.exports = router;
