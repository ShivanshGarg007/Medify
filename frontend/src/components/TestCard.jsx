export default function TestCard({ test, onBook }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{test.name}</h3>
      <p className="text-sm text-gray-600">Medical test</p>
      <p className="font-bold">₹{test.price}</p>
      <button
        className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
        onClick={() => onBook(test._id)}
      >
        Book Test
      </button>
    </div>
  );
}
