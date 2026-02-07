import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-slate-800">WiseSpend 💸</h1>

      {/* Buttons */}
      <div className="flex gap-8 font-medium text-slate-700">
        <Link to="/" className="hover:text-green-600 transition">
          Dashboard
        </Link>

        <Link to="/add" className="hover:text-green-600 transition">
          Add Expense
        </Link>

        <Link to="/history" className="hover:text-green-600 transition">
          History
        </Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
}

export default Navbar;
