function AdviceBox({ savings, goal }) {
  let message = "";

  if (savings >= goal) message = "🔥 Goal reached! Awesome saving!";
  else if (savings > goal * 0.6) message = "👍 Almost there, keep going!";
  else message = "⚠️ Try reducing food or shopping expenses";

  return <div className="bg-yellow-100 p-3 rounded">{message}</div>;
}

export default AdviceBox;
