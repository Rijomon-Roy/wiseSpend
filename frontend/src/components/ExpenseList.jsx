import { deleteTransaction } from "../api/transactionApi";

function ExpenseList({ expenses, refresh }) {
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    refresh();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">History</h3>

      <div className="space-y-3">
        {expenses.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white rounded-xl shadow p-4"
          >
            {/* left info */}
            <div>
              <p className="font-semibold">
                {item.title} ({item.category})
              </p>

              <p className="text-sm text-gray-500">
                ₹ {item.amount} • {item.type} •{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>

            {/* delete button */}
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
