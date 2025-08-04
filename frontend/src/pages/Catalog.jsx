import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TestCard from '../components/TestCard.jsx';

export default function Catalog() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.get('/tests').then(res => setTests(res.data || []));
  }, []);

  const handleBook = async (testId) => {
    await api.post('/bookings', { test: testId });
    alert('Test Booked!');
  };

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tests.map(test => (
          <TestCard key={test._id} test={test} onBook={handleBook} />
        ))}
      </div>
    </>
  );
}
