function AdviceBox({ savings, goal }) {
  let message = "";

  if (savings < 0) {
    message = `❌ You overspent by ₹${Math.abs(savings)}`;
  } else if (savings >= goal) {
    message = "🔥 Goal reached! Awesome saving!";
  } else if (savings > goal * 0.6) {
    message = "👍 Almost there, keep going!";
  } else {
    message = `⚠️ ₹${goal - savings} more needed to reach your goal`;
  }

  return (
    <div className="bg-yellow-100 p-3 rounded">
      {message}
    </div>
  );
}

export default AdviceBox; 