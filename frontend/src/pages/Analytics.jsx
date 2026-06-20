import { useEffect, useState, useRef } from "react";

import CategoryChart from "../components/CategoryChart";
import SpendingTrendChart from "../components/SpendingTrendChart";
import ExpenseList from "../components/ExpenseList";
import { getTransactions } from "../api/transactionApi";

export default function Analytics() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ⭐ reference for scroll
  const listRef = useRef(null);

  // ================= FETCH =================
const fetchData = async () => {
  try {
    const res = await getTransactions();
    setTransactions(res.data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
};

useEffect(() => {
  fetchData();
}, []);

  // ================= CALCULATIONS =================

// Only expenses
const expenseTransactions = transactions.filter(
  (t) => t.type === "expense"
);

const total = expenseTransactions.reduce(
  (s, t) => s + Number(t.amount || 0),
  0
);

  const categoryMap = {};

  expenseTransactions.forEach((t) => {
  const category = (t.category || "Other").toLowerCase();

  categoryMap[category] =
    (categoryMap[category] || 0) + Number(t.amount || 0);
});

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const avg =
  expenseTransactions.length > 0
    ? (total / expenseTransactions.length).toFixed(0)
    : 0;

  // ================= FILTER =================
  const filteredTransactions = selectedCategory
    ? transactions.filter(
        (t) => (t.category || "Other").toLowerCase() === selectedCategory,
      )
    : transactions;

  // ================= SCROLL FUNCTION =================
  const scrollToList = (category = null) => {
    setSelectedCategory(category);

    setTimeout(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // ================= AI ADVICE =================
  let advice = "Great job managing your spending 👍";

  if (topCategory && total > 0) {
    const percent = ((topCategory[1] / total) * 100).toFixed(0);

    const categoryName = topCategory?.[0] || "Other"; // ✅ FIX

if (expenseTransactions.length < 3) {
  advice =
    "Add more transactions to get accurate spending insights.";
} else if (percent > 50) {
  advice =
    `⚠️ ${categoryName} takes ${percent}% of your expenses. Try reducing it.`;
} else if (percent > 30) {
  advice =
    `💡 You spend quite a bit on ${categoryName}. Consider budgeting.`;
}
  }
  // ================= UI =================
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Analytics</h1>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Spent</p>
          <h2 className="text-xl font-bold">₹ {total}</h2>
        </div>

        {/* Scroll to ALL */}
        <div
          onClick={() => scrollToList(null)}
          className="bg-white p-4 rounded-xl shadow cursor-pointer hover:scale-105 transition"
        >
          <p className="text-sm text-gray-500">Transactions</p>
        <h2 className="text-xl font-bold">
  {expenseTransactions.length}
</h2>
          <p className="text-xs text-blue-500 mt-1">View below ↓</p>
        </div>

        {/* Scroll to category */}
        <div
          onClick={() => scrollToList(topCategory?.[0])}
          className="bg-white p-4 rounded-xl shadow cursor-pointer hover:scale-105 transition"
        >
          <p className="text-sm text-gray-500">Top Category</p>
          <h2 className="text-xl font-bold">{topCategory?.[0] || "—"}</h2>
          <p className="text-xs text-blue-500 mt-1">Show details ↓</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Avg Spend</p>
          <h2 className="text-xl font-bold">₹ {avg}</h2>
        </div>
      </div>

      {/* ================= AI ADVICE ================= */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl mb-6">
        <p className="font-semibold">🤖 Smart Advice</p>
        <p className="text-sm text-gray-700">{advice}</p>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
       <CategoryChart transactions={expenseTransactions} />

<SpendingTrendChart
  transactions={expenseTransactions}
/>
      </div>

      {/* ================= TRANSACTION LIST ================= */}
      <div ref={listRef} className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">
          {selectedCategory
            ? `${selectedCategory} Transactions`
            : "All Transactions"}
        </h3>

        <ExpenseList expenses={filteredTransactions} refresh={fetchData} />
      </div>
    </div>
  );
}
