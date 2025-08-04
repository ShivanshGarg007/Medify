const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
require('dotenv').config();

const bookingRoutes = require('./routes/bookings');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB Error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/tests', testRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => console.log('Server running on port 5000'));
