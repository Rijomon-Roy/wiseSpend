/*What to show:

Total Income

Total Expense

Balance
*/
function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card income">Income: ₹50,000</div>
        <div className="card expense">Expense: ₹20,000</div>
        <div className="card balance">Balance: ₹30,000</div>
      </div>
    </div>
  );
}

export default Dashboard;
