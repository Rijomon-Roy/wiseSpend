import { useState } from "react";
import { addTransaction } from "../api/transactionApi";

export default function AddTransaction({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addTransaction(form);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
    });

    refresh(); // reload list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
      />

      <select name="type" onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input name="category" placeholder="Category" onChange={handleChange} />

      <button>Add</button>
    </form>
  );
}
