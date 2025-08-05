const express = require('express');
const router = express.Router();

// Simple health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// HEAD request handler for minimal data transfer
router.head('/', (req, res) => {
  res.status(200).end();
});

module.exports = router;