import { useState } from "react";

function AddExpense({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date,
    };

    addExpense(expense); // 🔥 send to parent

    // Reset form
    setTitle("");
    setAmount("");
    setType("Expense");
    setCategory("Food");
    setDate("");
  }

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="Income"
              checked={type === "Income"}
              onChange={(e) => setType(e.target.value)}
            />
            Income
          </label>

          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="type"
              value="Expense"
              checked={type === "Expense"}
              onChange={(e) => setType(e.target.value)}
            />
            Expense
          </label>
        </div>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          min="0"
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
