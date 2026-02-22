import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUser();
  const [open, setOpen] = useState(false);

  const goProtected = (path, message) => {
    if (!loggedIn) {
      navigate("/login", {
        state: {
          message,
          from: path,
        },
      });
      return;
    }
    navigate(path);
  };

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        WiseSpend 💸
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-6 items-center font-medium">
        <button onClick={() => navigate("/")}>Dashboard</button>

        <button onClick={() => goProtected("/add", "Login to add expenses")}>
          Add Expense
        </button>

        <button
          onClick={() => goProtected("/history", "Login to view history")}
        >
          History
        </button>

        <button
          onClick={() => goProtected("/analytics", "Login to view analytics")}
        >
          Analytics
        </button>

        {/* USER MENU */}
        {loggedIn && user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="bg-slate-100 px-3 py-1 rounded"
            >
              {user.name}
            </button>

            {open && (
              <div className="absolute right-0 bg-white shadow rounded mt-2 w-36">
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-slate-100"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>

                <button
                  className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
