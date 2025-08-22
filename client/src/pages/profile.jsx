import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false"); // clear auth
    setOpen(false); // close dropdown
    toast.success("Logged out successfully!");
    navigate("/"); // redirect home
  };

  return (
    <div className="relative" ref={dropdownRef}>
    

      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition"
      >
        <CgProfile className="text-gray-700" size={32} />
      </button>

      {/* Dropdown Menu with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border p-2 z-50"
          >
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <CgProfile size={18} /> Profile
            </Link>

            {/* History Link */}
            <Link
              to="/history"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <FiClock size={18} /> History
            </Link>

            <hr className="my-2 border-gray-200" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-100 text-red-600 transition"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
