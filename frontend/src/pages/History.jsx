import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ExpenseList from "../components/ExpenseList";
import { getTransactions } from "../api/transactionApi";

export default function History() {
  const [expenses, setExpenses] = useState([]);
  const [searchParams] = useSearchParams();

  const categoryFilter = searchParams.get("category");

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getTransactions();
    setExpenses(res.data);
  };

  // ================= FILTER =================
  const filteredExpenses = categoryFilter
    ? expenses.filter((e) => e.category === categoryFilter)
    : expenses;

  // ================= UI =================
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        📜 History
        {categoryFilter && (
          <span className="text-sm ml-3 text-blue-500">
            (Filtered: {categoryFilter})
          </span>
        )}
      </h1>

      <div className="bg-white rounded-xl shadow p-4">
        <ExpenseList expenses={filteredExpenses} refresh={fetchData} />
      </div>
    </div>
  );
}
