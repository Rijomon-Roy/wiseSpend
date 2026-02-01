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
    <div className="app">
      <h1 className="title">WiseSpend 💸</h1>

      {/* summary cards */}
      <div className="summary-grid">
        <div className="card income">
          <h3>Income</h3>
          <p>₹ {summary.income}</p>
        </div>

        <div className="card expense">
          <h3>Expense</h3>
          <p>₹ {summary.expense}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>₹ {summary.balance}</p>
        </div>
      </div>

      {/* chart */}
      <div className="section">
        <ExpenseChart summary={summary} />
      </div>

      {/* form */}
      <div className="section">
        <AddExpense refresh={fetchData} />
      </div>

      {/* history */}
      <div className="section">
        <ExpenseList expenses={expenses} refresh={fetchData} />
      </div>
    </div>
  );
}

export default App;
