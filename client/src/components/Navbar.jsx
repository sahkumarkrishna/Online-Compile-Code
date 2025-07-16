import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl text-green-600 font-bold">
            CodeCompiler
          </Link>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Show settings icon only on /editor */}
            {location.pathname === "/editor" && (
              <Link to="/settings" title="Settings">
                <FiSettings className="text-green-700 hover:text-green-900 text-2xl transition" />
              </Link>
            )}

            {/* Show Login button if not logged in */}
            {!isLoggedIn && (
              <Link
                to="/login"
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
