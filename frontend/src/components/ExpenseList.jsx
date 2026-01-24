function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div>
      <h3>History</h3>

      {expenses.map((item) => (
        <div key={item.id} className="card">
          <p>{item.title}</p>
          <p>₹ {item.amount}</p>
          <p>{item.type}</p>

          <button onClick={() => deleteExpense(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
