import { deleteTransaction } from "../api/transactionApi";

function ExpenseList({ expenses = [], refresh }) {
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      if (refresh) await refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return "No date";
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "Invalid date";
      return d.toLocaleDateString();
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-slate-700">History</h3>

      {expenses.length === 0 && (
        <p className="text-sm text-gray-500">No transactions yet</p>
      )}

      <div className="space-y-2">
        {expenses.map((item) => {
          const isIncome = item.type === "income";

          return (
            <div
              key={item._id}
              className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 rounded-lg px-4 py-2"
            >
              <div>
                <p className="text-sm font-medium">
                  {item.title} ({item.category})
                </p>

                <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${
                    isIncome ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "-"} ₹ {item.amount}
                </span>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpenseList;
