/*Pages needed:

Dashboard

Add Expense

History
*/

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Expense Tracker</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Expense</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
