export default function Summary({
  income,
  expenses,
  savings,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-100 p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-600">Income</h3>
        <p className="text-2xl font-bold text-green-600">
          ₹{income}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-600">Expense</h3>
        <p className="text-2xl font-bold text-red-600">
          ₹{expenses}
        </p>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-600">Balance</h3>
        <p
          className={`text-2xl font-bold ${
            savings >= 0
              ? "text-blue-600"
              : "text-red-600"
          }`}
        >
          ₹{savings}
        </p>
      </div>
    </div>
  );
}