const path = require('path');
const Test = require('../models/Test');

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
};

// Serve static PDF report (no DB lookup)
exports.getTestReport = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'MEDIFY LAB REPORT.pdf');

    res.download(filePath, `lab_report.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending PDF report' });
      }
    });
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
