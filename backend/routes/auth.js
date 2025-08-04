const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await Patient.create({ name, email, password: hashed });

    res.status(201).json({ message: 'Registered successfully', user: newUser });
  } 
  
  catch {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Patient.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ message: 'Login successful', token });
  } 
  
  catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Login error' });
  }
});

module.exports = router;
