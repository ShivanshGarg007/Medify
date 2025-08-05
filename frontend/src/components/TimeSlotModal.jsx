import { useState } from 'react';

export default function TimeSlotModal({ isOpen, onClose, onConfirm, testId }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Generate time slots from 9 AM to 5 PM with 1-hour intervals
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    today.setHours(9, 0, 0, 0); // Start at 9 AM

    for (let i = 0; i < 9; i++) { // 9 AM to 5 PM (9 slots)
      const slotTime = new Date(today);
      slotTime.setHours(slotTime.getHours() + i);
      slots.push({
        id: i,
        time: slotTime,
        label: slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleConfirm = () => {
    if (selectedSlot !== null) {
      onConfirm(testId, timeSlots[selectedSlot].time);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Select a Time Slot</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {timeSlots.map((slot, index) => (
            <button
              key={slot.id}
              className={`py-2 px-4 rounded-md text-sm font-medium ${selectedSlot === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              onClick={() => setSelectedSlot(index)}
            >
              {slot.label}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedSlot === null}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white ${selectedSlot !== null
              ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              : 'bg-blue-400 cursor-not-allowed'}`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}