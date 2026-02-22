import { useState } from "react";
import { addTransaction } from "../api/transactionApi";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await addTransaction({
        title,
        amount: Number(amount),
        type: type.toLowerCase(),
        category,
        date,
      });

      // ✅ Redirect to history after success
      navigate("/history");
    } catch (err) {
      console.error("Add transaction failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-5 text-slate-700">
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />

        <div className="flex items-center gap-4">
          <label>
            <input
              type="radio"
              value="Income"
              checked={type === "Income"}
              onChange={(e) => setType(e.target.value)}
            />{" "}
            Income
          </label>

          <label>
            <input
              type="radio"
              value="Expense"
              checked={type === "Expense"}
              onChange={(e) => setType(e.target.value)}
            />{" "}
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
          className="border rounded-lg px-3 py-2"
        />

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

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          {loading ? "Adding..." : "+ Add"}
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
