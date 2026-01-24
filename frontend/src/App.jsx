import { useState } from "react";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  // ➕ Add expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // ❌ Delete expense
  const deleteExpense = (id) => {
    const updated = expenses.filter((item) => item.id !== id);
    setExpenses(updated);
  };

  // 💰 Calculations
  const income = expenses
    .filter((e) => e.type === "Income")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const expenseTotal = expenses
    .filter((e) => e.type === "Expense")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const balance = income - expenseTotal;

  return (
    <div className="container">
      <h1>WiseSpend 💸</h1>

      <h2>Balance: ₹ {balance}</h2>
      <p>
        Income: ₹ {income} | Expense: ₹ {expenseTotal}
      </p>

      <AddExpense addExpense={addExpense} />

      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
