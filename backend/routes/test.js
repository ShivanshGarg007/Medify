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
    const testId = req.params.id;
    const test = await Test.findById(testId);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Create dummy report content
    const reportContent = `
LABORATORY REPORT
================

Test Name: ${test.name}
Test ID: ${test._id}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

RESULTS:
--------
Status: Normal
Value: Within normal range
Reference Range: Standard

NOTES:
------
This is a dummy laboratory report for demonstration purposes.
The actual test results would be populated here in a real system.

Generated on: ${new Date().toISOString()}
    `.trim();

    // Set headers for file download
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="lab_report_${testId}.txt"`);
    
    res.send(reportContent);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ message: 'Error generating report' });
  }
});

module.exports = router;
