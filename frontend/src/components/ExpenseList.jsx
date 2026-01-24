function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div>
      <h3>History</h3>

      {expenses.map((item) => (
        <div key={item.id} className="card">
          <p>
            {item.title} ({item.category})
          </p>

          <p>
            ₹ {item.amount} • {item.type} • {item.date}
          </p>

          <button onClick={() => deleteExpense(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
