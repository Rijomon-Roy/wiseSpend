import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* -------- PAGES -------- */
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

/* -------- COMPONENTS -------- */
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import Navbar from "./components/Navbar";
import GoalSetter from "./components/GoalSetter";
import AdviceBox from "./components/AdviceBox";
import ProgressBar from "./components/ProgressBar";

/* -------- API & AUTH -------- */
import { getTransactions, getSummary } from "./api/transactionApi";
import { isLoggedIn } from "./utils/auth";

/* ---------------- PROTECTED ROUTE (SOFT AUTH) ---------------- */
const ProtectedRoute = ({ children, message }) => {
  if (isLoggedIn()) return children;

  return (
    <Navigate
      to="/login"
      replace
      state={{ message, from: window.location.pathname }}
    />
  );
};

/* ---------------- LAYOUT ---------------- */
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [goal, setGoal] = useState(0);

  /* -------- FETCH DATA ONLY IF LOGGED IN -------- */
  const fetchData = async () => {
    try {
      const res = await getTransactions();
      setExpenses(res.data);

      const sum = await getSummary();
      setSummary(sum.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchData();
    }
  }, []);

  const savings = summary.balance;
  const progress = goal > 0 ? Math.min((savings / goal) * 100, 100) : 0;

  return (
    <BrowserRouter>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
          <Routes>
            {/* 🌍 PUBLIC DASHBOARD */}
            <Route
              path="/"
              element={
                <div className="max-w-5xl mx-auto px-4 py-6">
                  <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
                    WiseSpend 💸
                  </h1>

                  {/* GOAL */}
                  <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
                    <GoalSetter goal={goal} setGoal={setGoal} />
                    <ProgressBar value={progress} />
                    <AdviceBox savings={savings} goal={goal} />
                  </div>

                  {/* SUMMARY */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="rounded-xl p-4 shadow bg-green-50 border-l-4 border-green-500">
                      ₹ {summary.income}
                    </div>
                    <div className="rounded-xl p-4 shadow bg-red-50 border-l-4 border-red-500">
                      ₹ {summary.expense}
                    </div>
                    <div className="rounded-xl p-4 shadow bg-blue-50 border-l-4 border-blue-500">
                      ₹ {summary.balance}
                    </div>
                  </div>

                  {/* CHART */}
                  <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <ExpenseChart
                      income={summary.income}
                      expense={summary.expense}
                    />
                  </div>
                </div>
              }
            />

            {/* 🔐 PROTECTED FEATURES */}
            <Route
              path="/add"
              element={
                <ProtectedRoute message="Login to add expenses">
                  <AddExpense />
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute message="Login to view history">
                  <History />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute message="Login to view analytics">
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute message="Login to view your profile">
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 🔓 AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔁 SAFE FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
