/*
Fields:

Title

Amount

Type (Income / Expense)

Date
*/
import { useState } from "react";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const expense = {
      title,
      amount,
      category,
      date,
    };

    console.log("Expense Added:", expense);

    // Clear form
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  }

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

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
