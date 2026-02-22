import { useEffect, useState } from "react";
import ExpenseList from "../components/ExpenseList";
import { getTransactions } from "../api/transactionApi";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getTransactions();
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📜 History</h1>

        <button
          onClick={() => navigate("/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Expense
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <ExpenseList expenses={expenses} refresh={fetchData} />
      </div>
    </div>
  );
}
