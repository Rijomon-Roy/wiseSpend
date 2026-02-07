import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddExpense from "./pages/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import Navbar from "./components/Navbar";
import GoalSetter from "./components/GoalSetter";
import AdviceBox from "./components/AdviceBox";
import ProgressBar from "./components/ProgressBar";
import Analytics from "./pages/Analytics";

import { getTransactions, getSummary } from "./api/transactionApi";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [goal, setGoal] = useState(0);

  //  fetch from backend safely
  const fetchData = async () => {
    try {
      const res = await getTransactions();
      setExpenses(res.data);

      const sum = await getSummary();
      setSummary(sum.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const savings = summary.balance;

  const progress = goal > 0 ? Math.min((savings / goal) * 100, 100) : 0;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <Navbar />

        <Routes>
          {/* ===== Dashboard (current page) ===== */}
          <Route
            path="/"
            element={
              <div className="max-w-5xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
                  WiseSpend 💸
                </h1>

                {/* GOAL */}
                <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
                  <GoalSetter goal={goal} setGoal={setGoal} />
                  <ProgressBar value={progress} />
                  <AdviceBox savings={savings} goal={goal} />
                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl p-4 shadow bg-green-50 border-l-4 border-green-500">
                    ₹ {summary.income}
                  </div>
                  <div className="rounded-xl p-4 shadow bg-red-50 border-l-4 border-red-500">
                    ₹ {summary.expense}
                  </div>
                  <div className="rounded-xl p-4 shadow bg-blue-50 border-l-4 border-blue-500">
                    ₹ {summary.balance}
                  </div>
                </div>

                {/* CHART */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                  <ExpenseChart
                    income={summary.income}
                    expense={summary.expense}
                  />
                </div>

                {/* FORM */}
                <div className="bg-white rounded-xl shadow p-4 mb-6">
                  <AddExpense refresh={fetchData} />
                </div>

                {/* HISTORY */}
                <div className="bg-white rounded-xl shadow p-4">
                  <ExpenseList expenses={expenses} refresh={fetchData} />
                </div>
              </div>
            }
          />

          {/* ===== Analytics Page ===== */}
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
