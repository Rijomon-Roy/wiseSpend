function SummaryCards({ income, expenses, goal }) {
  const savings = income - expenses;

  const progress =
    goal > 0
      ? Math.max(0, Math.min((savings / goal) * 100, 100))
      : 0;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="card">Income ₹{income}</div>

      <div className="card">Expenses ₹{expenses}</div>

      <div className="card">
        {savings >= 0
          ? `Saved ₹${savings}`
          : `Overspent ₹${Math.abs(savings)}`}
      </div>

      <div className="card">
        Goal {progress.toFixed(0)}%
      </div>
    </div>
  );
}

export default SummaryCards;