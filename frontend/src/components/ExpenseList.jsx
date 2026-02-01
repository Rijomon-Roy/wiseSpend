import { deleteTransaction } from "../api/transactionApi";

function ExpenseList({ expenses, refresh }) {
  const handleDelete = async (id) => {
    await deleteTransaction(id); // 🔥 delete from MongoDB
    refresh(); // reload list
  };

  return (
    <div>
      <h3>History</h3>

      {expenses.map((item) => (
        <div key={item._id} className="card">
          <p>
            {item.title} ({item.category})
          </p>

          <p>
            ₹ {item.amount} • {item.type} •{" "}
            {new Date(item.date).toLocaleDateString()}
          </p>

          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
