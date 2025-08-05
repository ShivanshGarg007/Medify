export default function TestCard({ test, onBook }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition duration-300 ease-in-out">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{test.description || 'Medical test'}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">₹{test.price}</p>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            onClick={() => onBook(test._id)}
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
}
