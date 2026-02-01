import { useEffect, useState } from "react";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

import { getTransactions, getSummary } from "./api/transactionApi";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // 🔥 fetch from backend
  const fetchData = async () => {
    const res = await getTransactions();
    setExpenses(res.data);

    const sum = await getSummary();
    setSummary(sum.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10">WiseSpend 💸</h1>

        {/* Summary cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-gray-500">Income</p>
            <h2 className="text-3xl font-bold text-green-600">
              ₹ {summary.income}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-gray-500">Expense</p>
            <h2 className="text-3xl font-bold text-red-600">
              ₹ {summary.expense}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-gray-500">Balance</p>
            <h2 className="text-3xl font-bold text-blue-600">
              ₹ {summary.balance}
            </h2>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <ExpenseChart summary={summary} />
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <AddExpense refresh={fetchData} />
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl shadow p-6">
          <ExpenseList expenses={expenses} refresh={fetchData} />
        </div>
      </div>
    </div>
  );
}

export default App;
