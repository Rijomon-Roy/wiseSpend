import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ income = 0, expense = 0 }) {
  // ================= SAFE VALUES =================
  const incomeValue = Number(income) || 0;
  const expenseValue = Number(expense) || 0;

  // ================= CALCULATIONS =================
  const balance = incomeValue - expenseValue;

  const savingsRate = incomeValue
    ? ((balance / incomeValue) * 100).toFixed(0)
    : 0;

  // ================= CHART DATA =================
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [incomeValue, expenseValue],
        backgroundColor: [
          "#22c55e", // green
          "#ef4444", // red
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  // ================= OPTIONS =================
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹ ${ctx.raw}`,
        },
      },
    },
    animation: {
      animateScale: true,
    },
  };

  // ================= UI =================
  return (
    <div className="bg-white rounded-xl shadow p-5 w-full max-w-sm mx-auto">
      <h3 className="text-center font-semibold mb-4 text-slate-700">
        Income vs Expense
      </h3>

      <div className="relative h-64">
        {/* Chart */}
        <Doughnut data={data} options={options} />

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-500">Balance</p>

          <p
            className={`text-lg font-bold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹ {balance}
          </p>

          <p className="text-xs text-gray-400 mt-1">{savingsRate}% saved</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
