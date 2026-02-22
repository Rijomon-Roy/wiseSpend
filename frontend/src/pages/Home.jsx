import { useNavigate } from "react-router-dom";
import Summary from "../components/Summary";
import ExpenseChart from "../components/ExpenseChart";
import GoalSetter from "../components/GoalSetter";
import AdviceBox from "../components/AdviceBox";

function Home() {
  const navigate = useNavigate();

  const income = 20000;
  const expenses = 12000;
  const goal = Number(localStorage.getItem("goal")) || 5000;
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
      <GoalSetter />

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
