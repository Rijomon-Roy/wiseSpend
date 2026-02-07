import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MonthlyBarChart({ transactions = [] }) {
  const monthMap = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    monthMap[month] = (monthMap[month] || 0) + t.amount;
  });

  const data = {
    labels: Object.keys(monthMap),
    datasets: [
      {
        label: "Monthly Spend",
        data: Object.values(monthMap),
        backgroundColor: "#3b82f6",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full h-80">
      <h3 className="text-center font-semibold mb-3">Monthly Spending</h3>

      <Bar data={data} options={options} />
    </div>
  );
}
