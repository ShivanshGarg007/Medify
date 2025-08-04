import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings').then(res => setBookings(res.data || []));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
                 {bookings.map(b => (
           <div key={b._id} className="p-4 border rounded mb-2">
             <p>Test ID: {typeof b.test === 'object' ? b.test._id : b.test}</p>
             <p>Date: {new Date(b.date).toLocaleString()}</p>
             <a 
               href={`http://localhost:5000/api/tests/${typeof b.test === 'object' ? b.test._id : b.test}`}
               target="_blank"
               className="text-blue-600 hover:underline"
             >
               Download Report
             </a>
           </div>
         ))}
      </div>
    </>
  );
}
