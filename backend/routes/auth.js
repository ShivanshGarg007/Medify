const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new patient
router.post('/register', authController.register);

// Login a patient
router.post('/login', authController.login);

module.exports = router;
