import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ summary }) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary.income, summary.expense],
      },
    ],
  };

  return <Pie data={data} />;
}
