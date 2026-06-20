  import { useNavigate } from "react-router-dom";
  import Summary from "../components/Summary";
  import ExpenseChart from "../components/ExpenseChart";
  import GoalSetter from "../components/GoalSetter";
  import AdviceBox from "../components/AdviceBox";
  import { useEffect, useState } from "react";
  import { getTransactions } from "../api/transactionApi";

  function Home() {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  const [goal, setGoal] = useState(
    Number(localStorage.getItem("goal")) || 0
  );
  useEffect(() => {
  localStorage.setItem("goal", goal);
}, [goal]);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const savings = income - expenses;
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* DASHBOARD HEADER */}
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>

        {/* QUICK ACTIONS (THIS IS IMPORTANT) */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/add")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            ➕ Add Expense
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            📜 History
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            📊 Analytics
          </button>
        </div>

        {/* DASHBOARD CONTENT */}
        <GoalSetter
    goal={goal}
    setGoal={setGoal}
  />

        <Summary
          income={income}
          expenses={expenses}
          savings={savings}
          goal={goal}
        />

        <ExpenseChart income={income} expense={expenses} />

        <AdviceBox savings={savings} goal={goal} />
      </div>
    );
  }

  export default Home;
