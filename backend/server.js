const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const PORT = 5000;
require('dotenv').config();

const bookingRoutes = require('./routes/booking');
const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials : true }));
app.use(express.json());

// app.use(express.static("frontend/dist"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => console.log('Server running on port 5000'));
