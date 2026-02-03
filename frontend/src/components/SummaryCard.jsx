function SummaryCards({ income, expenses, goal }) {
  const savings = income - expenses;
  const progress = Math.min((savings / goal) * 100, 100);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="card">Income ₹{income}</div>
      <div className="card">Expenses ₹{expenses}</div>
      <div className="card">Saved ₹{savings}</div>
      <div className="card">Goal {progress.toFixed(0)}%</div>
    </div>
  );
}

export default SummaryCards;
