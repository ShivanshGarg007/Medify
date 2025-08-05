# 🏥 Medify – Patient Portal for Booking & Viewing Lab Tests

A full-stack web application where patients can register, browse lab tests, book a test, and download dummy lab reports. Built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 📌 Features

### 👨‍⚕️ Frontend (React)
- 🔐 Patient Registration with basic form validation
- 📋 View available lab tests (fetched from backend)
- 📅 View booking history with test details and scheduled time slot
- 📄 Download dummy PDF lab reports

### 🧠 Backend (Node.js + Express)
- ✅ REST API to register patient
- 📃 GET endpoint for lab tests catalog
- 📝 POST endpoint to book a test
- 📎 GET endpoint to download a dummy PDF report

### 🗂️ Database (MongoDB)
- Stores patient data, test catalog, and booking history

---

## ⚙️ Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | React + Tailwind CSS   |
| Backend    | Node.js + Express.js   |
| Database   | MongoDB (Mongoose)     |
| Auth       | JSON Web Token (JWT) *(Bonus)* |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ShivanshGarg007/Medify.git
cd Medify
