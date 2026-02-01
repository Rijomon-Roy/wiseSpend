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

    await addTransaction({
      title,
      amount: Number(amount),
      type: type.toLowerCase(),
      category,
      date,
    });

    refresh();

    setTitle("");
    setAmount("");
    setType("Expense");
    setCategory("Food");
    setDate("");
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-5 text-slate-700">
        Add Transaction
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Type toggle */}
        <div className="flex items-center gap-4">
          <label
            className={`flex items-center gap-1 cursor-pointer text-sm font-medium ${
              type === "Income" ? "text-green-600" : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              name="type"
              value="Income"
              checked={type === "Income"}
              onChange={(e) => setType(e.target.value)}
            />
            Income
          </label>

          <label
            className={`flex items-center gap-1 cursor-pointer text-sm font-medium ${
              type === "Expense" ? "text-red-600" : "text-gray-500"
            }`}
          >
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
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          + Add
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
