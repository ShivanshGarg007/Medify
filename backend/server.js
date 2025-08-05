const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const bookingRoutes = require('./routes/booking');
const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

const app = express();

// --- START: New Robust CORS Configuration ---

const frontendURL = process.env.FRONTEND_URL;

// Log the URL the server is using for CORS
console.log(`CORS Policy: Allowing requests from origin: ${frontendURL}`);

if (!frontendURL) {
    console.error("FATAL ERROR: FRONTEND_URL environment variable is not set.");
}

const corsOptions = {
    origin: frontendURL,
    credentials: true
};

app.use(cors(corsOptions));

// --- END: New CORS Configuration ---

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/health', healthRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// const bookingRoutes = require('./routes/booking');
// const testRoutes = require('./routes/test');
// const authRoutes = require('./routes/auth');
// const healthRoutes = require('./routes/health');

// const app = express();
// app.use(cors({ 
//   origin: [process.env.FRONTEND_URL], 
//   credentials: true 
// }));
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('DB Error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/tests', testRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/health', healthRoutes);

// app.listen(PORT, () => console.log('Server running on port 5000'));
