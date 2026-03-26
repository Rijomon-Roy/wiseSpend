import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
export default function CategoryChart({ transactions = [] }) {
  const categoryMap = {};

  transactions.forEach((t) => {
    const category = (t.category || "Other").toLowerCase();

    categoryMap[category] =
      (categoryMap[category] || 0) + Number(t.amount || 0);
  });

  const labels = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  const data = {
    labels,
    datasets: [
      {
        data: values,
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

  if (labels.length === 0) {
    return <p className="text-center text-gray-500">No data</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full max-w-md mx-auto">
      <h3 className="text-center font-semibold mb-3">Category Breakdown</h3>

      <div className="h-64">
        <Pie data={data} />
      </div>
    </div>
  );
}
