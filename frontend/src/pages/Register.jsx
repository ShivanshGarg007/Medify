import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', form);
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 font-semibold">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" required className="w-full p-2 border"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input type="email" placeholder="Email" required className="w-full p-2 border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="password" placeholder="Password" required className="w-full p-2 border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
