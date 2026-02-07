import AddExpense from "./AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";

export default function History() {
  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
    const res = await getTransactions();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📜 History</h1>

      <div className="bg-white rounded-xl shadow p-4">
        <AddExpense refresh={fetchData} />
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <ExpenseList expenses={expenses} refresh={fetchData} />
      </div>
    </div>
  );
}
