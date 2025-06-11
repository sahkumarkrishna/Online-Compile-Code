import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    if (isLoggedIn) {
      if (role === "Admin") navigate("/dashboard");
      else navigate("/");
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target["signin-email"].value;
    const password = e.target["signin-password"].value;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}login`, { email, password });
      const { token, user } = response.data;

      if (token) localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", user.role);
      }

      toast.success("Sign In Successful!");
      e.target.reset();

      if (user.role === "Admin") navigate("/dashboard");
      else navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Sign In failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target["signup-name"].value;
    const email = e.target["signup-email"].value;
    const password = e.target["signup-password"].value;
    const role = e.target["signup-role"].value;

    if (!name || !email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE}signup`, { name, email, password, role });
      toast.success("Account created successfully!");
      e.target.reset();
      setIsSignIn(true);
    } catch (error) {
      const msg = error.response?.data?.message || "Sign Up failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-sans bg-gradient-to-br from-teal-200 to-green-200 text-gray-900 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden border border-green-300">
        {/* Left Panel */}
        <div className="md:w-2/4 w-full bg-gradient-to-tr from-teal-400 via-green-300 to-lime-200 text-white flex flex-col justify-center items-center p-8 md:p-16">
          <h2 className="text-3xl font-bold bg-white/60 bg-clip-text text-transparent mb-3 text-center tracking-wide">
            {isSignIn ? "Welcome Back!" : "Hello, Friend!"}
          </h2>
          <p className="text-center mb-6 px-6 md:px-12 text-sm md:text-base max-w-sm">
            {isSignIn
              ? "To stay connected with us, please login with your personal info."
              : "Enter your personal details and start your journey with us!"}
          </p>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="border border-white px-6 py-2 rounded-full text-sm md:text-base hover:bg-white hover:text-teal-600 transition-all duration-300"
          >
            {isSignIn ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>

        {/* Right Panel (Form) */}
        <div className="md:w-4/6 w-full bg-white text-gray-900 flex flex-col justify-center items-center p-8 md:p-16">
          {isSignIn ? (
            <>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent mb-4 text-center">
                Sign In
              </h2>
              <form
                className="flex flex-col items-center space-y-4 w-full max-w-sm"
                onSubmit={handleSignIn}
              >
                <input
                  id="signin-email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
                />
                <input
                  id="signin-password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-2 rounded-full w-full hover:from-teal-500 hover:to-green-500 transition-all"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "SIGN IN"}
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="text-teal-600 hover:underline font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-4 text-center">
                Create Account
              </h2>
              <p className="text-gray-600 text-sm mb-4 text-center">
                Or use your email for registration:
              </p>
              <form
                className="flex flex-col items-center space-y-4 w-full max-w-sm"
                onSubmit={handleSignUp}
              >
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                />
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                />
                <select
                  id="signup-role"
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                  defaultValue="User"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-6 py-2 rounded-full w-full hover:from-green-500 hover:to-teal-500 transition-all"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "SIGN UP"}
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-green-600 hover:underline font-semibold"
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
