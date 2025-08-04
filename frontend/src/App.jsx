import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Bookings from './pages/Bookings';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/catalog" : "/login"} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
