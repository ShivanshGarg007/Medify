import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Bookings from './pages/Bookings';
import keepServerAlive from './services/keepAlive';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  // Initialize the keep-alive service when the app starts
  useEffect(() => {
    // Check if we're in production environment (like Render)
    // In development, we don't need to keep the server alive
    const isProduction = import.meta.env.PROD;
    
    // Start the keep-alive service only in production
    const cleanup = keepServerAlive(isProduction);
    
    // Clean up the interval when the component unmounts
    return cleanup;
  }, []);

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
