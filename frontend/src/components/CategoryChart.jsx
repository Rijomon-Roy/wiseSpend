import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ transactions = [] }) {
  const categoryMap = {};

  transactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full max-w-md mx-auto">
      <h3 className="text-center font-semibold mb-3">Category Breakdown</h3>

      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
