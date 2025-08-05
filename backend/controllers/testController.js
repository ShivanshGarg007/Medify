const Test = require('../models/test');

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
};

// Get test by ID and generate report
exports.getTestReport = async (req, res) => {
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
};