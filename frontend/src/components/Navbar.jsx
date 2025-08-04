import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">Patient Portal</Link>
      <div className="space-x-4">
        <Link to="/catalog">Catalog</Link>
        <Link to="/bookings">My Bookings</Link>
        <button onClick={handleLogout} className="bg-red-500 px-2 rounded">Logout</button>
      </div>
    </nav>
  );
}
