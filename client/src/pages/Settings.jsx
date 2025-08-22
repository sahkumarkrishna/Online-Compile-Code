import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const USER_API_END_POINT = import.meta.env.VITE_API_BASE_URL;

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!password) {
      toast.error("New password cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${USER_API_END_POINT}/update-profile`,
        {
          password,        // only send new password
          currentPassword, // send current password for verification
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Update Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border px-4 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-600">
            Current Password *
          </label>
          <input
            type="password"
            placeholder="Enter Current Password"
            className="w-full border px-4 py-2 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
