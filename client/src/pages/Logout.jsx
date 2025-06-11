// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Make a POST request to backend logout route
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}logout`, {}, {
          withCredentials: true, // if you're using cookies for auth
        });

        // Clear local storage or token if used
        localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("token");

        alert("Logged out successfully");

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Failed to logout. Try again.");
      }
    };

    logoutUser();
  }, [navigate]);

  return null;
};

export default Logout;
