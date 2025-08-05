import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { format } from 'date-fns';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings').then(res => setBookings(res.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>
          
          {bookings.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {bookings.map(b => (
                  <li key={b._id}>
                    <div className="px-4 py-5 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                      <div className="flex items-center justify-between">
                        <div>
<h3 className="text-lg leading-6 font-medium text-gray-900">
  {b.test?.name || 'Medical Test'}
</h3>
<p className="mt-1 max-w-2xl text-sm text-gray-500">
  Test ID: {b.test?._id || b.test || 'N/A'}
</p>

                          <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Booked on: {new Date(b.date).toLocaleString()}
                          </p>
                          {b.timeSlot && (
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              <span className="font-medium">Time Slot:</span> {format(new Date(b.timeSlot), 'h:mm a')}
                            </p>
                          )}
                        </div>
                        <div>
<a 
  href={`${import.meta.env.VITE_API_BASE_URL}/tests/report/${b.test?._id || b.test || 'dummy'}`}
  download
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
>
  Download Report
</a>



                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
              <p className="text-gray-500 text-lg">You don't have any bookings yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
