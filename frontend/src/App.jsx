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
    <div className="container">
      <h1>WiseSpend 💸</h1>

      <h2>Balance: ₹ {summary.balance}</h2>
      <p>
        Income: ₹ {summary.income} | Expense: ₹ {summary.expense}
      </p>

      {/* pass refresh instead of addExpense */}
      <AddExpense refresh={fetchData} />

      {/* pass refresh instead of deleteExpense */}
      <ExpenseList expenses={expenses} refresh={fetchData} />
    </div>
  );
}

export default App;
