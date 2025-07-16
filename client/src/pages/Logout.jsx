// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // POST request to backend logout route
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
          withCredentials: true, // if using cookies
        });

        // Clear local storage or tokens
        localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("token");

        toast.success("Logged out successfully");

        // Redirect to login
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Failed to logout. Try again.");
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // No UI
};

export default Logout;
