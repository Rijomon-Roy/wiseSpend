import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom"; //

import AddExpense from "./pages/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import Navbar from "./components/Navbar";
import GoalSetter from "./components/GoalSetter";
import AdviceBox from "./components/AdviceBox";
import ProgressBar from "./components/ProgressBar";

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
      {" "}
      {/*  MUST HAVE for Link / Router */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* ===== Title ===== */}
          <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
            WiseSpend 💸
          </h1>

          {/* ===== GOAL ===== */}
          <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
            <GoalSetter goal={goal} setGoal={setGoal} />
            <ProgressBar value={progress} />
            <AdviceBox savings={savings} goal={goal} />
          </div>

          {/* ===== SUMMARY CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl p-4 shadow bg-green-50 border-l-4 border-green-500">
              <p className="text-sm text-gray-600">Income</p>
              <h2 className="text-2xl font-bold text-green-600">
                ₹ {summary.income}
              </h2>
            </div>

            <div className="rounded-xl p-4 shadow bg-red-50 border-l-4 border-red-500">
              <p className="text-sm text-gray-600">Expense</p>
              <h2 className="text-2xl font-bold text-red-600">
                ₹ {summary.expense}
              </h2>
            </div>

            <div className="rounded-xl p-4 shadow bg-blue-50 border-l-4 border-blue-500">
              <p className="text-sm text-gray-600">Balance</p>
              <h2 className="text-2xl font-bold text-blue-600">
                ₹ {summary.balance}
              </h2>
            </div>
          </div>

          {/* ===== CHART ===== */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <ExpenseChart income={summary.income} expense={summary.expense} />
          </div>

          {/* ===== FORM ===== */}
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <AddExpense refresh={fetchData} />
          </div>

          {/* ===== HISTORY ===== */}
          <div className="bg-white rounded-xl shadow p-4">
            <ExpenseList expenses={expenses} refresh={fetchData} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
