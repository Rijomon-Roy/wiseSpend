import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
);

export default function SpendingTrendChart({ transactions = [] }) {
  const dayMap = {};

  transactions.forEach((t) => {
    const day = new Date(t.date).toLocaleDateString();
    dayMap[day] = (dayMap[day] || 0) + t.amount;
  });

  const data = {
    labels: Object.keys(dayMap),
    datasets: [
      {
        label: "Daily Spending",
        data: Object.values(dayMap),
        fill: true,
        tension: 0.4,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full h-80">
      <Line data={data} />
    </div>
  );
}
