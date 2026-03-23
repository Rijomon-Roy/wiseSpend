import { useState } from "react";
import { loginUser } from "../api/auth";
import { setAuth } from "../utils/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 message & redirect path from navbar / protected route
  const infoMessage = location.state?.message;
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      console.log("EMAIL:", email);
      console.log("PASSWORD:", password);
      setAuth(res.data.token, res.data.user, remember);

      // 🔹 redirect back to the feature user wanted
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="bg-slate-900 w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to WiseSpend 💸
        </h2>

        {/* 🔔 INFO MESSAGE (from navbar / protected route) */}
        {infoMessage && (
          <p className="bg-yellow-500/20 text-yellow-300 p-2 rounded mb-4 text-sm">
            ⚠️ {infoMessage}
          </p>
        )}

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-sm text-slate-400"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Hide" : "Show"}
            </span>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-slate-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
