# Patient Portal

A medical test booking application with time slot selection.

## Deployment on Render

### Backend Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - Environment: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
4. Add the following environment variables:
   - `NODE_ENV`: production
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `FRONTEND_URL`: URL of your frontend (e.g., https://patient-portal-frontend.onrender.com)

### Frontend Deployment

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Use the following settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
4. Add the following environment variable:
   - `VITE_API_BASE_URL`: URL of your backend API (e.g., https://patient-portal-backend.onrender.com/api)

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting Deployment

If you encounter the error `Cannot find module '../models/booking'` on Render, it's likely due to case sensitivity in file paths on Linux vs Windows. Make sure your import statements match the exact case of your file names:

```javascript
// Correct way to import models on case-sensitive file systems (Linux/Render)
const Booking = require('../models/Booking');
const Test = require('../models/Test');
const Patient = require('../models/Patient');
```

Alternatively, rename your model files to match the imports:

```
models/
  ├── Booking.js  (instead of booking.js)
  ├── Test.js     (instead of test.js)
  └── Patient.js  (instead of patient.js)
```