import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl text-green-600 font-bold">
            Green Label
          </Link>

          {/* Login/Logout Button */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={handleLogin}
                className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
