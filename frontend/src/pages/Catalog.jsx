import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TestCard from '../components/TestCard.jsx';
import TimeSlotModal from '../components/TimeSlotModal.jsx';

export default function Catalog() {
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  useEffect(() => {
    api.get('/tests').then(res => setTests(res.data || []));
  }, []);

  const handleBook = (testId) => {
    setSelectedTestId(testId);
    setIsModalOpen(true);
    setBookingConfirmed(false);
    setBookingError(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTestId(null);
  };

  const handleConfirmBooking = async (testId, timeSlot) => {
    try {
      await api.post('/bookings', { test: testId, timeSlot });
      setIsModalOpen(false);
      setSelectedTestId(null);
      setBookingConfirmed(true);
      
      // Auto-hide the confirmation message after 5 seconds
      setTimeout(() => {
        setBookingConfirmed(false);
      }, 5000);
    } catch (error) {
      console.error('Error booking test:', error);
      setBookingError(true);
      
      // Auto-hide the error message after 5 seconds
      setTimeout(() => {
        setBookingError(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookingConfirmed && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">Your test has been booked successfully.</span>
          </div>
        )}
        
        {bookingError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">Failed to book test. Please try again.</span>
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Tests</h1>
        {tests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map(test => (
              <TestCard 
                key={test._id} 
                test={test} 
                onBook={() => handleBook(test._id)} 
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Loading available tests...</p>
        )}
      </div>
      
      <TimeSlotModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmBooking} 
        testId={selectedTestId} 
      />
    </div>
  );
}
