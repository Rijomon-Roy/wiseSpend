import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ income = 0, expense = 0 }) {
  const incomeValue = Number(income) || 0;
  const expenseValue = Number(expense) || 0;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [incomeValue, expenseValue], // always real data
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
        cutout: "65%",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹ ${ctx.raw}`,
        },
      },
    },
  };

  return (
    // 🔥 ONLY chart, NO card styling
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">Overview</h3>

      <div className="w-64 h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default ExpenseChart;
