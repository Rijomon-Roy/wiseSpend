export default function Summary({ summary }) {
  return (
    <div>
      <h3>Income: ₹{summary.income}</h3>
      <h3>Expense: ₹{summary.expense}</h3>
      <h3>Balance: ₹{summary.balance}</h3>
    </div>
  );
}
