const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// GET endpoint for tests catalog 
router.get('/', testController.getAllTests);

// GET endpoint to return dummy report data as file 
router.get('/:id', testController.getTestReport);

module.exports = router;
