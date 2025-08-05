
# Medify – Patient Portal for Booking & Viewing Lab Tests

Medify is a full-stack patient-facing web application built for a digital health clinic. It allows users to register as patients, view available lab tests, book a test, and download dummy lab test reports.

## 🌐 Live Demo

- **Frontend:** [https://medify-shivansh.netlify.app](https://medify-shivansh.netlify.app)
- **Backend (API):** [https://medify-yidt.onrender.com](https://medify-yidt.onrender.com)

---

## 📌 Features

### 🖥️ Frontend (React + TailwindCSS)
- Patient registration form
- Lab test catalog fetched from backend
- Booking a test with patient and test linkage
- View booking history
- Download dummy test report (PDF)
- Clean and user-friendly UI with responsive layout

### 🛠️ Backend (Node.js + Express + MongoDB)
- REST API endpoints for:
  - Patient registration
  - Retrieving lab tests
  - Booking a lab test
  - Downloading dummy test report
- JWT-based authentication middleware
- MongoDB integration for storing patients, bookings, and tests

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/patients/register` | Register a new patient |
| `POST` | `/api/patients/login` | Login patient and return JWT |
| `GET`  | `/api/tests` | Get list of available lab tests |
| `POST` | `/api/bookings` | Book a test (requires patient + test info) |
| `GET`  | `/api/bookings` | Get booking history of logged-in user |
| `GET`  | `/api/tests/:id` | Download dummy test report as PDF |

---

## 🔐 Authentication

- JWT tokens are used to authenticate and authorize patient actions.
- Protected routes require a valid token in the request headers.

---

## 📦 Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | React, Tailwind CSS, Axios     |
| Backend   | Node.js, Express.js            |
| Database  | MongoDB + Mongoose             |
| Auth      | JWT (JSON Web Tokens)          |
| Hosting   | Netlify (Frontend), Render (Backend) |

---

## 📁 Folder Structure

```

Medify/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── App.jsx

````

---

## 🧰 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ShivanshGarg007/Medify.git
cd Medify
````

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📝 Dummy Report

* A static dummy PDF file is returned when a user clicks **Download Report** on their booking history.
* Endpoint: `GET /api/tests/:id`

---

## ✨ Bonus Features

* Secure JWT authentication
* Protected API routes
* Error handling and validation on frontend

---

## 🙌 Author

Made with ❤️ by [Shivansh Garg](https://github.com/ShivanshGarg007)

---

## 📄 License

This project is for educational purposes only. All rights reserved.

```
