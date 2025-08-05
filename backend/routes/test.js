const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// All tests list
router.get('/', testController.getAllTests);

// Report download
router.get('/report/:id', testController.getTestReport);

module.exports = router;
