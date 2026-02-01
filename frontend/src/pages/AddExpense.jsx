import { useState } from "react";
import { addTransaction } from "../api/transactionApi";

function AddExpense({ refresh }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // 🔥 send to backend (MongoDB)
    await addTransaction({
      title,
      amount: Number(amount),
      type: type.toLowerCase(), // backend expects income/expense
      category,
      date,
    });

    refresh(); // reload list + summary

    // reset form
    setTitle("");
    setAmount("");
    setType("Expense");
    setCategory("Food");
    setDate("");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-3 items-center"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 w-40"
        />

        {/* Income / Expense */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="Income"
              checked={type === "Income"}
              onChange={(e) => setType(e.target.value)}
            />
            Income
          </label>

          <label className="flex items-center gap-1 cursor-pointer">
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

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          min="0"
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 w-32"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
